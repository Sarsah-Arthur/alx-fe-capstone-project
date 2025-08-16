import React, { useState } from "react";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // Imported API key from .en
  const API_KEY =
    import.meta.env.VITE_WEATHER_API_KEY || "66bf69cb29ed1124d36c96d71efe2933";

  if (import.meta.env.DEV) {
    console.log("API Key:", API_KEY);
  }

  const fetchWeather = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    try {
      setError("");
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${API_KEY}&units=metric`;

      if (import.meta.env.DEV) {
        console.log("Fetching:", url);
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 401 || data.message?.toLowerCase().includes("invalid api key")) {
        setError("Invalid API key. Please check your .env file.");
        setWeather(null);
        return;
      }

      if (data.cod === "404") {
        setError("City not found. Please check the spelling.");
        setWeather(null);
        return;
      }

      setWeather({
        name: data.name,
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        icon: data.weather[0].icon,
        condition: data.weather[0].description,
      });
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Unable to fetch weather data. Please try again.");
      setWeather(null);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold">Weather App</h1>

      <div className="flex space-x-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="border border-gray-300 rounded px-3 py-2 flex-grow"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {weather && (
        <div className="bg-gray-100 p-4 rounded mt-4">
          <h2 className="text-xl font-semibold">{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.condition}
          />
          <p className="text-lg">{weather.condition}</p>
          <p>🌡 Temperature: {weather.temp}°C</p>
          <p>💧 Humidity: {weather.humidity}%</p>
          <p>💨 Wind Speed: {weather.wind} km/h</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
