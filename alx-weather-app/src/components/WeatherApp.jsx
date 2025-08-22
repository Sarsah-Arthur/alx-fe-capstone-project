import React, { useState } from "react";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Imported API key from .env
  const API_KEY =
    import.meta.env.VITE_WEATHER_API_KEY || "66bf69cb29ed1124d36c96d71efe2933";

  const handleSearch = async (city) => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found!");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-sky-300 to-sky-400 flex flex-col items-center justify-center p-6 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Weather Dashboard</h1>

      {/* Search Input */}
      <SearchBar onSearch={handleSearch} />

      {/* Loader */}
      {loading && <Loader />}

      {/* Error Message */}
      {!loading && error && <ErrorMessage message={error} />}

      {/* WeatherCard */}
      {!loading && weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}
