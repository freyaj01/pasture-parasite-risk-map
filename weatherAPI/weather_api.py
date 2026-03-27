from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from urllib import request as url_request
import datetime
import os

# Get the path to the JSON file
json_path = os.path.join(os.path.dirname(__file__), 'englandRegionData.json')
# Load the data
with open(json_path, 'r') as f:
    REGION_DATA = json.load(f)

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend


# ─────────────────────────────────────────────
# WEATHER FORECAST
# ─────────────────────────────────────────────

def get_weather_forecast(coords=None):
    try:
        api_key = "58e31f1988f9f25c55e23501dabcca22"

        # Choose URL based on whether coordinates are provided
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

        # Next 9 forecast periods
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
        print("Error fetching forecast:", e)
        return None


# ─────────────────────────────────────────────
# CURRENT WEATHER
# ─────────────────────────────────────────────

def get_current_weather(lat, lon):
    try:
        api_key = "58e31f1988f9f25c55e23501dabcca22"
        url = (
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


# ─────────────────────────────────────────────
# RECENT RAINFALL (last 14 days via Open-Meteo)
# Added try/except — previously would crash if API failed
# ─────────────────────────────────────────────

def get_recent_rainfall(lat, lon):
    try:
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
    except Exception as e:
        print("Error fetching recent rainfall:", e)
        return 0  # Safe fallback — treats as dry if API fails


# ─────────────────────────────────────────────
# WEATHER RISK SCORING
# ─────────────────────────────────────────────

def getRainfallscore(mm14):
    if mm14 > 50:   return 100
    if mm14 >= 30:  return 75
    if mm14 >= 10:  return 50
    return 25


def getTemperatureScore(temp):
    # Thresholds based on published parasite development data:
    # H. contortus lower limit 18°C (PubMed 16883278)
    # T. circumcincta active above ~5-7°C (GLOWORM-FL)
    # Nematodirus hatching zone 10-17°C (PubMed 17991303)
    if temp > 18:   return 100
    if temp >= 12:  return 75
    if temp >= 6:   return 50
    return 25


def getHumidityScore(humidityPercent):
    if humidityPercent > 80:    return 100
    if humidityPercent >= 60:   return 75
    if humidityPercent >= 40:   return 50
    return 25


def getSeasonScore(date):
    month = date.month
    if month in [3, 4, 5]:    return 100  # Spring — peak risk (PPR + larval hatch)
    if month in [6, 7, 8]:    return 50   # Summer — moderate
    if month in [9, 10, 11]:  return 75   # Autumn — second peak
    return 25                              # Winter — low risk


def getWeatherRiskScore(recentRainfall, temp, humidity):
    rainfallScore = getRainfallscore(recentRainfall) * 0.5
    tempScore     = getTemperatureScore(temp)         * 0.3
    humidityScore = getHumidityScore(humidity)        * 0.1
    seasonScore   = getSeasonScore(datetime.date.today()) * 0.1

    weatherRisk = rainfallScore + tempScore + humidityScore + seasonScore
    return weatherRisk * 0.4  # Worth 40% of overall risk score


# ─────────────────────────────────────────────
# NEW: ELEVATION
# Source: Open-Meteo elevation API — same provider
# already used for weather, no extra API key needed.
# Scientific basis: SCOPS Nematodirus forecast —
# every 100m altitude delays larval hatching ~7 days
# ─────────────────────────────────────────────

def get_elevation_score(lat, lon):
    """
    Fetches elevation in metres from Open-Meteo and converts
    to a parasite risk score. Higher altitude = lower risk
    because cooler temperatures delay larval development.
    Falls back to 50 (neutral) if the API call fails.
    """
    try:
        url = (
            f"https://api.open-meteo.com/v1/elevation?"
            f"latitude={lat}&longitude={lon}"
        )
        data = json.load(url_request.urlopen(url))
        elevation = data["elevation"][0]

        print(f"Elevation at ({lat}, {lon}): {elevation}m")

        if elevation < 100:  return 100  # Lowland — highest risk
        if elevation < 200:  return 80
        if elevation < 300:  return 60
        if elevation < 500:  return 35
        return 15                         # Upland/mountain — minimal risk

    except Exception as e:
        print("Error fetching elevation:", e)
        return 50  # Neutral fallback — doesn't skew score if API fails


# ─────────────────────────────────────────────
# UPDATED BASE RISK
# Was: rainfallScore (50%) + livestockScore (30%) + prevalenceScore (20%)
# Now: rainfallScore (50%) + elevationScore (50%)
# Livestock and prevalence removed — elevation replaces them for now.
# Soil type will be added in the next step.
# ─────────────────────────────────────────────

def calculate_base_risk(region, lat, lon):
    """
    Rainfall still comes from your JSON (unchanged for now).
    Elevation is new — fetched live from coordinates.
    Combined 50/50 as an interim split until soil is added.
    """
    if region not in REGION_DATA:
        return None, None, None

    rainfall_score  = REGION_DATA[region]["rainfallScore"]
    base_risk_score = REGION_DATA[region]["baseRiskScore"]
    elevation_score = get_elevation_score(lat, lon)

    base_raw   = (rainfall_score * 0.5) + (elevation_score * 0.5)
    base_score = round(base_raw * 0.6, 1)  # 60% of total

    return base_score, rainfall_score, elevation_score


# ─────────────────────────────────────────────
# ROUTES
# ─────────────────────────────────────────────

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
    lat    = request.args.get('lat', type=float)
    lon    = request.args.get('lon', type=float)
    region = request.args.get('region', type=str)

    if lat is None or lon is None or region is None:
        return jsonify({"error": "Missing lat, lon, or region parameter"}), 400

    # Base risk — now includes live elevation
    base_score, rainfall_score, elevation_score = calculate_base_risk(region, lat, lon)
    if base_score is None:
        return jsonify({"error": f"Region '{region}' not found"}), 404

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
    total      = round(base_score + weather_risk, 1)
    risk_level = (
        "Very High" if total >= 75 else
        "High"      if total >= 50 else
        "Moderate"  if total >= 25 else
        "Low"
    )

    return jsonify({
        "region":      region,
        "baseRisk":    base_score,
        "weatherRisk": round(weather_risk, 1),
        "totalRisk":   total,
        "riskLevel":   risk_level,
        # Breakdown so frontend can show what contributed to the score
        "breakdown": {
            "rainfallScore":  rainfall_score,
            "elevationScore": elevation_score,
        },
        "weather": {
            "temp":           current_weather["temp"],
            "humidity":       current_weather["humidity"],
            "recentRainfall": round(recent_rainfall, 1)
        }
    })


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