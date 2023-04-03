import React, { useEffect, useState } from "react";
import "./Body.css";
import weatherlogo from "/React Projects/weatherapp/src/Assets/weatherlogo.png";
import summer from "/React Projects/weatherapp/src/Assets/summer.jpg";
import rain from "/React Projects/weatherapp/src/Assets/rain.jpg";
import winter from "/React Projects/weatherapp/src/Assets/winter.jpg";
import { getformattedData } from "../fetchingApiCall";

export default function Body() {
  const date = new Date();
  console.log(date);
  let year = date.getFullYear();
  let day = date.getDay();
  console.log(day);
  let longMonth = date.toLocaleString("en-us", { month: "long" });
  const [weather, setWeather] = useState([]);
  const [bg, setBg] = useState();
  const units = "metric";
  useEffect(() => {
    const fetchedData = async () => {
      const data = await getformattedData(units);
      setWeather(data);
      console.log(data);
      if (data.temp >= 30) {
        setBg(winter);
      } else if (data.temp <= 30 || data.description.includes("rainy")) {
        setBg(rain);
      } else if (data.temp > 40) {
        setBg(summer);
      }
    };
    fetchedData();
  }, []);

  return (
    <div className="app__container" style={{ backgroundImage: `url(${bg})` }}>
      <div className="header-container">
        <img src={weatherlogo} alt="logo" className="logo-image" />
        <p>FORECASTER</p>
      </div>
      <div className="city__name__container">
        <div>
          <h1 className="city__heading">
            {weather.name},{weather.country}
          </h1>
          <p className="date">
            {longMonth} {day} {year}
          </p>
          <h1 className="temp__heading">{weather.temp}°C</h1>
          <p className="feellike__text">Feels like {weather.feels_like}°C</p>
        </div>
        <div className="weather__description">
          <h1>{weather.description}</h1>
          <img src={weather.iconUrl} alt="logo" />
        </div>
      </div>
      <div className="options__container">
        <div>
          <p>Humidity</p>
          <h3>{weather.humidity}%</h3>
        </div>
        <div>
          <p>Pressure</p>
          <h1>{weather.pressure}Pha</h1>
        </div>
        <div>
          <p>Visibility</p>
          <h1>{weather.visibility}kms</h1>
        </div>
        <div>
          <p>Wind Speed</p>
          <h1>{weather.speed}m/s</h1>
        </div>
        <div>
          <p>Min.temp</p>
          <h1>{weather.temp_min}°C</h1>
        </div>
        <div>
          <p>Max.temp</p>
          <h1>{weather.temp_max}°C</h1>
        </div>
      </div>
    </div>
  );
}
