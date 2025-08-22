import React, { useState } from "react";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import ErrorMessage from "./ErrorMessage";

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  // Example handler: will be connected to API later
  const handleSearch = (city) => {
    if (city.toLowerCase() === "accra") {
      // Dummy test data for now
      setWeatherData({
        name: "Accra",
        weather: [{ description: "Clear sky" }],
        main: { temp: 30, humidity: 70, feels_like: 32 },
        wind: { speed: 5 },
      });
      setError("");
    } else {
      setError("City not found!");
      setWeatherData(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Weather Dashboard</h1>

      {/* Search Input */}
      <SearchBar onSearch={handleSearch} />

      {/* Error Message */}
      {error && <ErrorMessage message={error} />}

      {/* WeatherCard */}
      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}
