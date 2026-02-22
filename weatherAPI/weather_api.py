from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from urllib import request as url_request
import datetime
# Load region data
import os

# Get the path to the JSON file
json_path = os.path.join(os.path.dirname(__file__), 'englandRegionData.json')
# Load the data
with open(json_path, 'r') as f:
    REGION_DATA = json.load(f)

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

def get_weather_forecast(coords=None):
    try:
        api_key = "58e31f1988f9f25c55e23501dabcca22"
        
        # choose URL based on whether coordinates are provided
        if coords:
            url = (
                "https://api.openweathermap.org/data/2.5/forecast?"
                f"lat={coords['lat']}&lon={coords['lon']}&appid={api_key}&units=metric"
            )
        else:
            url = (
                "https://api.openweathermap.org/data/2.5/forecast?"
                f"q=Manchester,uk&appid={api_key}&units=metric"
            )
        
        data = json.load(url_request.urlopen(url))
        
        forecast = {
            "city": data["city"]["name"],
            "country": data["city"]["country"],
            "periods": []
        }
        
        # next 9 forecast periods
        for period in data["list"][:9]:
            forecast["periods"].append({
                "timestamp": datetime.datetime.fromtimestamp(period["dt"]).isoformat(),
                "temp": round(period["main"]["temp"]),
                "description": period["weather"][0]["description"].title(),
                "icon": f"https://openweathermap.org/img/wn/{period['weather'][0]['icon']}.png",
                "humidity": period["main"]["humidity"],
                "windSpeed": period["wind"]["speed"]
            })
        
        return forecast
    except Exception as e:
        print("Error:", e)
        return None

@app.route('/api/weather', methods=['GET'])
def weather():
    lat = request.args.get('lat', type=float)
    lon = request.args.get('lon', type=float)
    
    if lat is not None and lon is not None:
        coords = {"lat": lat, "lon": lon}
        forecast = get_weather_forecast(coords=coords)
    else:
        forecast = get_weather_forecast()
    
    if forecast:
        return jsonify(forecast)
    else:
        return jsonify({"error": "Failed to fetch weather data"}), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "ok"})

@app.route('/api/parasite-risk', methods=['GET'])
def parasite_risk():
    lat = request.args.get('lat', type=float)
    lon = request.args.get('lon', type=float)
    region = request.args.get('region', type=str)
    
    if lat is None or lon is None or region is None:
        return jsonify({"error": "Missing lat, lon, or region parameter"}), 400
    
    # Get base risk from region data
    if region not in REGION_DATA:
        return jsonify({"error": f"Region '{region}' not found"}), 404
    
    base_risk = REGION_DATA[region]["baseRiskScore"]
    
    # Get current weather data
    current_weather = get_current_weather(lat, lon)
    if not current_weather:
        return jsonify({"error": "Failed to fetch current weather"}), 500
    
    # Get recent rainfall
    recent_rainfall = get_recent_rainfall(lat, lon)
    
    # Calculate weather risk
    weather_risk = getWeatherRiskScore(
        recent_rainfall, 
        current_weather["temp"], 
        current_weather["humidity"]

    )
    
    # Calculate total risk
    parasite_risk = base_risk + weather_risk
    
    # Determine risk level
    if parasite_risk >= 75:
        risk_level = "Very High"
    elif parasite_risk >= 50:
        risk_level = "High"
    elif parasite_risk >= 25:
        risk_level = "Moderate"
    else:
        risk_level = "Low"
    
    return jsonify({
        "region": region,
        "baseRisk": base_risk,
        "weatherRisk": round(weather_risk, 1),
        "recentRainfall": round(recent_rainfall, 1),
        "currentTemp": current_weather["temp"],
        "currentHumidity": current_weather["humidity"],
        "regionData": REGION_DATA[region],
        "totalRisk": round(parasite_risk, 1),
        "riskLevel": risk_level,
        "weather": {
            "temp": current_weather["temp"],
            "humidity": current_weather["humidity"],
            "recentRainfall": round(recent_rainfall, 1)
        }
    })

def get_current_weather(lat, lon):
    try:
        api_key = "58e31f1988f9f25c55e23501dabcca22"
        url =(
            f"https://api.openweathermap.org/data/2.5/weather?"
            f"lat={lat}&lon={lon}&appid={api_key}&units=metric"
        )
        data = json.load(url_request.urlopen(url))
        return {
            "temp": data["main"]["temp"],
            "humidity": data["main"]["humidity"],
        }
    except Exception as e:
        print("Error fetching current weather:", e)
        return None
    
def get_recent_rainfall(lat, lon):
    end_date = datetime.date.today()
    start_date = end_date - datetime.timedelta(days=14)
    
    url = (
        f"https://archive-api.open-meteo.com/v1/archive?"
        f"latitude={lat}&longitude={lon}&"
        f"start_date={start_date}&end_date={end_date}&"
        f"hourly=precipitation"
    )
    
    data = json.load(url_request.urlopen(url))
    total_rainfall = sum(data["hourly"]["precipitation"])
    return total_rainfall

def getRainfallscore(mm14):
    if mm14 > 50:
        return 100
    if mm14 >= 30:
        return 75
    if mm14 >= 10:
        return 50
    return 25
def getTemperatureScore(temp):
    if temp > 18:
        return 100
    if temp >= 12:
        return 75
    if temp >= 6:
        return 50
    return 25
def getHumidityScore(humidityPercent):
    if humidityPercent > 80:
        return 100
    if humidityPercent >= 60:
        return 75
    if humidityPercent >= 40:
        return 50
    return 25
def getSeasonScore(date):
    month = date.month
    if month  in [3, 4, 5]:  # Spring
        return 75
    if month  in [6, 7, 8]:  # Summer
        return 50
    if month  in [9, 10, 11]:  # Autumn
        return 25
    # Winter
    return 25

def getWeatherRiskScore(recentRainfall, temp, humidity,):
    rainfallScore = getRainfallscore(recentRainfall)*0.5
    tempScore = getTemperatureScore(temp)*0.3
    humidityScore = getHumidityScore(humidity)*0.1
    seasonScore = getSeasonScore(datetime.date.today())*0.1

    weatherRisk = rainfallScore + tempScore + humidityScore + seasonScore
    return weatherRisk * 0.4 # worth 40% of overall risk score
    

if __name__ == '__main__':
    # Test the function first
    rainfall = get_recent_rainfall(53.48, -2.24)
    temp = 8  # Example temperature value
    humidity = 70  # Example humidity value

    weatherRisk = getWeatherRiskScore(rainfall, temp, humidity)

    print(f"Recent rainfall: {rainfall}mm")
    print(f"Weather Risk Score: {weatherRisk} points (out of 40)")
    
    # Then start the server
    app.run(debug=True, port=8000)




























# import json
# import datetime
# from urllib import request


# def get_weather_forecast(coords=None):
#     try:  # retrieves forecast for specified area
#         api_key = "58e31f1988f9f25c55e23501dabcca22" #this is the API key I got from OpenWeatherMap

#         # choose URL based on whether coordinates are provided
#         if coords:
#             url = (
#                 "https://api.openweathermap.org/data/2.5/forecast?"
#                 f"lat={coords['lat']}&lon={coords['lon']}&appid={api_key}&units=metric"
#             )
#         else:
#             url = (
#                 "https://api.openweathermap.org/data/2.5/forecast?"
#                 f"q=Manchester,uk&appid={api_key}&units=metric"
#             )

#         data = json.load(request.urlopen(url))

#         forecast = {
#             "city": data["city"]["name"],        #city name
#             "country": data["city"]["country"],  #country name
#             "periods": []                        #list to hold forecast data
#         }

#         # next 9 forecast periods
#         for period in data["list"][:9]:
#             forecast["periods"].append({
#                 "timestamp": datetime.datetime.fromtimestamp(period["dt"]),
#                 "temp": round(period["main"]["temp"]),
#                 "description": period["weather"][0]["description"].title(),
#                 "icon": f"https://openweathermap.org/img/wn/{period['weather'][0]['icon']}.png"
#             })

#         return forecast

#     except Exception as e:
#         print("Error:", e)
#         return None


# ## test get_weather_forecast ##
# print("\nTesting weather forecast retrieval..")

# forecast = get_weather_forecast()  # default: Manchester
# if forecast:
#     print(f"\nWeather forecast for {forecast['city']}, {forecast['country']} is...")
#     for period in forecast["periods"]:
#         print(
#             f" - {period['timestamp']} | "
#             f"{period['temp']}°C | "
#             f"{period['description']}"
#         )

# austin = {"lat": 30.2748, "lon": -97.7404}  # Texas State Capitol
# forecast = get_weather_forecast(coords=austin)
# if forecast:
#     print(f"\nWeather forecast for {forecast['city']}, {forecast['country']} is...")
#     for period in forecast["periods"]:
#         print(
#             f" - {period['timestamp']} | "
#             f"{period['temp']}°C | "
#             f"{period['description']}"
#         )

# invalid = {"lat": 1234.5678, "lon": 1234.5678}  # invalid coordinates
# forecast = get_weather_forecast(coords=invalid)
# if forecast is None:
#     print("Weather forecast for invalid coordinates returned None")