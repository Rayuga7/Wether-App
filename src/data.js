const data ={"coord":{"lon":-0.1257,"lat":51.5085},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"base":"stations","main":{"temp":283.4,"feels_like":282.6,"temp_min":282.2,"temp_max":284.14,"pressure":997,"humidity":81},"visibility":10000,"wind":{"speed":7.2,"deg":250},"clouds":{"all":20},"dt":1702270803,"sys":{"type":2,"id":2075535,"country":"GB","sunrise":1702281345,"sunset":1702309898},"timezone":0,"id":2643743,"name":"London","cod":200};
const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=london&appid=89119aa150e6bbf3f797efc8830edbd7');
89119aa150e6bbf3f797efc8830edbd7


{
    "location": {
        "name": "Pune",
        "region": "Maharashtra",
        "country": "India",
        "lat": 18.53,
        "lon": 73.87,
        "tz_id": "Asia/Kolkata",
        "localtime_epoch": 1702277934,
        "localtime": "2023-12-11 12:28"
    },
    "current": {
        "last_updated_epoch": 1702277100,
        "last_updated": "2023-12-11 12:15",
        "temp_c": 27.7,
        "temp_f": 81.8,
        "is_day": 1,
        "condition": {
            "text": "Sunny",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
            "code": 1000
        },
        "wind_mph": 6,
        "wind_kph": 9.7,
        "wind_degree": 127,
        "wind_dir": "SE",
        "pressure_mb": 1013,
        "pressure_in": 29.92,
        "precip_mm": 0,
        "precip_in": 0,
        "humidity": 40,
        "cloud": 15,
        "feelslike_c": 27.5,
        "feelslike_f": 81.6,
        "vis_km": 10,
        "vis_miles": 6,
        "uv": 7,
        "gust_mph": 7,
        "gust_kph": 11.2
    }
}