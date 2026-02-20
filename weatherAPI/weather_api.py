from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from urllib import request as url_request
import datetime

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

if __name__ == '__main__':
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