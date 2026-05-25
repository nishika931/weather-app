import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const apiKey = import.meta.env.VITE_API_KEY;
  

  const getWeather = async () => {

  if (city === "") {
    setError("Please enter city name");
    return;
  }

  setError("");

  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
  );

  const result = await response.json();

  if (result.error) {
    setError("City not found");
    setWeather(null);
  } else {
    setWeather(result);
  }
};

  return (
    <div className="container">
      <div className="block">
        <h1 className="title">Weather App</h1>

        <p>Real-time weather updates with accurate forecasts.</p>

        <div className="search">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          

          <button onClick={getWeather}>Search</button>
        </div>
        {error && <p className="error">{error}</p>}


        {weather && (
          <div className="weather-information">
            <h2>{weather.location.name}</h2>

            <img
              src={weather.current.condition.icon}
              alt="weather"
            />

            <h3>{weather.current.temp_c}°C</h3>

            <p>{weather.current.condition.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;