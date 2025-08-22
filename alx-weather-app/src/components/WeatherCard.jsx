import React from "react";

export default function WeatherCard({ data }) {
  if (!data) return null;

  // Map condition → emoji
  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return "☀️";
      case "Clouds":
        return "☁️";
      case "Rain":
        return "🌧️";
      case "Drizzle":
        return "🌦️";
      case "Thunderstorm":
        return "⛈️";
      case "Snow":
        return "❄️";
      case "Mist":
      case "Fog":
      case "Haze":
        return "🌫️";
      default:
        return "🌍"; // fallback
    }
  };

  const weatherMain = data.weather[0].main;
  const weatherDesc = data.weather[0].description;
  const icon = getWeatherIcon(weatherMain);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-6 mt-6 w-full max-w-md text-center">
      <h2 className="text-2xl font-semibold mb-2">{data.name}</h2>

      {/* Weather Icon */}
      <div className="text-6xl mb-2">{icon}</div>

      <p className="capitalize text-lg mb-4">{weatherDesc}</p>

      <div className="flex justify-around text-lg">
        <div className="flex flex-col items-center">
          🌡️
          <p>{Math.round(data.main.temp)}°C</p>
          <span className="text-sm opacity-80">
            Feels like {Math.round(data.main.feels_like)}°C
          </span>
        </div>

        <div className="flex flex-col items-center">
          💧
          <p>{data.main.humidity}%</p>
          <span className="text-sm opacity-80">Humidity</span>
        </div>

        <div className="flex flex-col items-center">
          💨
          <p>{data.wind.speed} m/s</p>
          <span className="text-sm opacity-80">Wind</span>
        </div>
      </div>
    </div>
  );
}
