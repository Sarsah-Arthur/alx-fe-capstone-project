import React from "react";
import { Search } from "lucide-react"; // nice search icon

export default function SearchBar({ city, setCity, handleSearch }) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
      {/* Input */}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
        className="w-full sm:flex-1 px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      {/* Button */}
      <button
        onClick={handleSearch}
        className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg shadow-md transition"
      >
        <Search size={18} />
        <span className="font-medium">Search</span>
      </button>
    </div>
  );
}
