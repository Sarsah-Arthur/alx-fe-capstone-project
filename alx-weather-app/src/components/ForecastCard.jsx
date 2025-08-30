import React from "react";

export default function ForecastCard({ days }) {
  if (!days || days.length === 0) {
    return <p className="text-center text-gray-700">No forecast available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {days.map((day, index) => {
        // Format date
        const date = new Date(day.dt * 1000).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        });

        // Convert sunrise & sunset
        const sunrise = new Date(day.sunrise * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const sunset = new Date(day.sunset * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div
            key={index}
            className="bg-white/80 rounded-xl shadow-md p-4 text-center"
          >
            <h3 className="text-lg font-semibold">{date}</h3>

            {/* Weather Icon */}
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="mx-auto"
            />

            {/* Description */}
            <p className="capitalize text-gray-600">{day.weather[0].description}</p>

            {/* High / Low Temps */}
            <p className="mt-2 text-lg font-bold">
              {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°
            </p>

            {/* Sunrise & Sunset */}
            <div className="mt-2 text-sm text-gray-700">
              <p>🌅 {sunrise}</p>
              <p>🌇 {sunset}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
