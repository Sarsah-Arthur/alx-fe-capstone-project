import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeatherApp from "./components/WeatherApp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeatherApp />} />
      </Routes>
    </BrowserRouter>
  );
}
