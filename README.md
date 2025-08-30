
---

# Weather App 🌦️

A simple and elegant weather app built with **React** and **Tailwind CSS**.
It allows users to search for any city and view real-time weather data fetched from the **OpenWeatherMap API**.

---

## ✨ Features

* 🔍 **City Search** – Enter a city name to fetch weather details.
* ✅ **Input Validation** – Prevents empty searches and displays helpful messages.
* ⏳ **Loader** – Smooth loading state while fetching data.
* ⚠️ **Error Handling** – User-friendly error messages for invalid city names or failed requests.
* 🌡️ **Weather Info** – Displays temperature, humidity, wind speed, and feels-like temperature.
* 🌤️ **Dynamic Icons** – Weather icons (sun, rain, clouds, etc.) update based on real API response.
* 🌅 **Sunrise & Sunset Times** – Shows local sunrise and sunset for the searched city.
* 📝 **Recent Searches** – Stores the last 5 searched cities in **localStorage** for quick access (via `useRecentSearches` hook).
* 📊 **5-Day Forecast** – Displays upcoming daily forecasts (temperature, conditions, icons).
* 🎨 **Dynamic Backgrounds** – Background gradients change to match current weather conditions.
* 📱 **Responsive Design** – Works seamlessly on desktop, tablet, and mobile.

---

## 🛠️ Tech Stack

* **React (Vite)**
* **Tailwind CSS**
* **OpenWeatherMap API**
* **LocalStorage**

---

## 🚀 Getting Started

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/alx-weather-app.git
   cd alx-weather-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Add your OpenWeatherMap API key to a `.env` file at the project root:

   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

   After creating/updating `.env`, restart the dev server if it is running.

4. Run the app locally:

   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```
src/
 ├── components/
 │    ├── SearchBar.jsx          # City search + recent searches UI
 │    ├── WeatherCard.jsx        # Current weather display (temp, humidity, wind, icon)
 │    ├── WeatherApp.jsx         # Main weather app component (mounted by App.jsx)
 │    ├── ErrorMessage.jsx       # Error UI
 │    ├── Loader.jsx             # Loading spinner
 │    └── ForecastCard.jsx       # Displays 5-day forecast
 ├── hooks/
 │    └── useRecentSearches.js   # Hook to persist recent searches in localStorage
 ├── App.jsx                     # App wrapper / router (imports WeatherApp)
 ├── main.jsx                    # React entry point
 ├── index.css                   # Global styles (Tailwind)
 └── ...
```

---

## 🔑 API Key Setup & Troubleshooting

* Ensure the API key is correct and active in your OpenWeather account.
* Put the key into `.env` as: `VITE_WEATHER_API_KEY=f0697f7e4ee19586b2cf87d6e88766a3` (no quotes).
* Restart the dev server after updating `.env`.
* If you receive `401 Unauthorized` or similar, double-check the key and that it’s fully activated in OpenWeather’s dashboard.

---

## 🌟 Future Enhancements

* 🌐 Multi-language support
* 📍 Auto-detect user location (Geolocation API)
* ⏱️ Hourly forecast view
* 🌑 Dark mode toggle

