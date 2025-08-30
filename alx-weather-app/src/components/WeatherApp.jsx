// src/components/WeatherApp.jsx
import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import ForecastCard from "./ForecastCard";
import useRecentSearches from "../hooks/useRecentSearches";

export default function WeatherApp() {
  const [city, setCity] = useState(""); // tracked searched city
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forecastError, setForecastError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const { recentSearches, addSearch } = useRecentSearches();

  const API_KEY =
    import.meta.env.VITE_WEATHER_API_KEY || "f0697f7e4ee19586b2cf87d6e88766a3";

  const nowTime = () => new Date().toLocaleTimeString();

  // fetch current weather by city name
  const fetchCurrent = useCallback(
    async (cityName) => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          cityName
        )}&appid=${API_KEY}&units=metric`
      );

      if (!res.ok) {
        if (res.status === 404) throw new Error("City not found. Please check the spelling.");
        if (res.status === 401) throw new Error("Invalid API key. Check your .env configuration.");
        throw new Error("Unable to fetch current weather. Please try again later.");
      }
      return res.json();
    },
    [API_KEY]
  );

  // fetch 7-day forecast using coords
  const fetchForecastByCoords = useCallback(
    async (lat, lon) => {
      setForecastError("");
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`
        );
        if (!res.ok) {
          if (res.status === 401) throw new Error("Forecast access denied (check One Call permission).");
          throw new Error("Unable to fetch forecast.");
        }
        const data = await res.json();
        if (!data.daily) throw new Error("Invalid forecast response.");
        setForecastData(data.daily.slice(0, 7));
      } catch (err) {
        setForecastData(null);
        setForecastError(err.message || "Unable to fetch forecast.");
      }
    },
    [API_KEY]
  );

  // fetch both current + forecast
  const fetchAll = useCallback(
    async (cityName) => {
      if (!cityName) return;
      setLoading(true);
      setError("");

      try {
        const current = await fetchCurrent(cityName);
        setWeatherData(current);
        setLastUpdated(nowTime());

        const { lat, lon } = current.coord || {};
        if (typeof lat === "number" && typeof lon === "number") {
          await fetchForecastByCoords(lat, lon);
        } else {
          setForecastData(null);
          setForecastError("Coordinates missing for forecast.");
        }
      } catch (err) {
        setWeatherData(null);
        setForecastData(null);
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    },
    [fetchCurrent, fetchForecastByCoords]
  );

  // user hits search (from SearchBar)
  const handleSearch = (cityName) => {
    const c = cityName?.trim();
    if (!c) {
      setError("Please enter a city name.");
      return;
    }
    setCity(c);
    addSearch(c);     // <-- save recent search
    fetchAll(c);
  };

  // auto refresh every minute
  useEffect(() => {
    if (!city) return;
    const id = setInterval(() => fetchAll(city), 60_000);
    return () => clearInterval(id);
  }, [city, fetchAll]);

  // dynamic background class
  const getBackgroundClass = () => {
    if (!weatherData) return "from-sky-200 via-sky-300 to-sky-400";
    const main = weatherData.weather?.[0]?.main?.toLowerCase() || "";
    if (main.includes("cloud")) return "from-gray-300 via-gray-400 to-gray-500";
    if (main.includes("rain")) return "from-blue-400 via-blue-500 to-blue-600";
    if (main.includes("clear")) return "from-yellow-200 via-yellow-300 to-orange-400";
    if (main.includes("snow")) return "from-blue-100 via-blue-200 to-white";
    if (main.includes("storm") || main.includes("thunder")) return "from-gray-700 via-gray-800 to-black";
    return "from-sky-200 via-sky-300 to-sky-400";
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${getBackgroundClass()} flex flex-col items-center justify-center p-6 text-gray-800 transition-colors duration-500`}
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Weather Dashboard</h1>

      {/* pass recentSearches into SearchBar */}
      <SearchBar onSearch={handleSearch} recentSearches={recentSearches} />

      {/* Manual Refresh */}
      {city && (
        <button
          onClick={() => fetchAll(city)}
          disabled={loading}
          className={`mt-4 px-4 py-2 font-medium rounded-lg shadow transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-sky-600 text-white hover:bg-sky-700"
          }`}
        >
          {loading ? "Refreshing..." : "Refresh Weather"}
        </button>
      )}

      {/* Loader */}
      {loading && <Loader />}

      {/* Global Error (current weather) */}
      {!loading && error && <ErrorMessage message={error} />}

      {/* Current Weather */}
      {!loading && weatherData && (
        <div className="w-full max-w-md bg-white/80 rounded-xl shadow p-4">
          <WeatherCard data={weatherData} />

          {/* Sunrise & Sunset for current day */}
          <div className="mt-4 text-sm text-gray-700 text-center">
            <p>🌅 Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
            <p>🌇 Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
          </div>

          {lastUpdated && (
            <p className="text-sm text-gray-700 mt-2 text-center">Last updated: {lastUpdated}</p>
          )}
        </div>
      )}

      {/* Forecast */}
      {!loading && !error && forecastData && (
        <div className="w-full max-w-5xl mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">7-Day Forecast</h2>
          {forecastError ? (
            <ErrorMessage message={forecastError} />
          ) : (
            <ForecastCard days={forecastData} />
          )}
        </div>
      )}
    </div>
  );
}
