import React, { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  const [recentCities, setRecentCities] = useState([]);

  // Load saved searches on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentCities")) || [];
    setRecentCities(saved);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    onSearch(city);

    // Save to recent searches
    let updated = [
      city,
      ...recentCities.filter((c) => c.toLowerCase() !== city.toLowerCase()),
    ];
    if (updated.length > 5) updated = updated.slice(0, 5);

    setRecentCities(updated);
    localStorage.setItem("recentCities", JSON.stringify(updated));

    setCity("");
  };

  const handleRecentClick = (c) => {
    setCity(c);
    onSearch(c);
  };

  return (
    <div className="relative w-full sm:w-72">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
          className="px-4 py-2 rounded-lg text-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-semibold transition"
        >
          🔍 Search
        </button>
      </form>

      {/* Recent Searches */}
      {recentCities.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {recentCities.map((c, i) => (
            <button
              key={i}
              onClick={() => handleRecentClick(c)}
              className="px-3 py-1 bg-gray-200 rounded-full text-sm hover:bg-gray-300 transition"
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
