import React, { useEffect, useState } from "react";

function App() {
  const API_KEY = "48505c5cd9e3239815d1747a31dc4dde";

  const [weather, setWeather] = useState();

  const [input, setInput] = useState("");

  const [coord, setCoord] = useState({});

  useEffect(() => {
    if (coord.length) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coord[0].lat}&lon=${coord[0].lon}&units=metric&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => setWeather(data))
        .catch((err) => console.log(err));
    }
  }, [coord]);

  const fetchGeo = (e) => {
    e.preventDefault();

    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((json) => setCoord(json))
      .catch((err) => console.log(err));
  };
  console.log(weather);

  return (
    <div className="wrapper">
      <form className="App" onSubmit={(e) => fetchGeo(e)}>
        <input
          type="text"
          placeholder="city"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button>Найти</button>
      </form>
      {weather && (
        <div>
          <h1>{weather?.name}</h1>
          <p>Ощущается как: {Math.round(weather.main.feels_like)}°C</p>
          <p>Влажность: {weather.main.humidity}%</p>
          <p>Температура: {Math.round(weather.main.feels_like)}°C</p>
          <p>Ветер: {Math.round(weather.wind.speed)} м/с</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt=""
          />
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
