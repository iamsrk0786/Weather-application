import { Oval } from "react-loader-spinner";
import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

function Weather() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const toDateFunction = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const WeekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  const search = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setInput("");
      setWeather({ ...weather, loading: true });
      const url = "https://api.openweathermap.org/data/2.5/weather";
      const api_key = "f00c38e0279b7bc85480c3fe775d518c";
      await axios
        .get(url, {
          params: {
            q: input,
            units: "metric",
            appid: api_key,
          },
        })
        .then((res) => {
          console.log("res", res);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setInput("");
          console.log("error", error);
        });
    }
  };

  return (
    <div className="container">
      <h1 id="app-name" className="text-center mt-5 mb-3">
        Weather Application
      </h1>
      <div id="search-bar" className="d-flex justify-content-center mb-3">
        <input
          type="text"
          id="city-search"
          className="form-control"
          placeholder="Enter City Name.."
          name="query"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyPress={search}
        />
      </div>
      {weather.loading && (
        <div className="text-center">
          <Oval type="Oval" color="black" height={100} width={100} />
        </div>
      )}
      {weather.error && (
        <div id="error-message" className="text-center">
          <FontAwesomeIcon icon={faFrown} />
          <span style={{ fontSize: "20px", marginLeft: "5px" }}>
            City not found
          </span>
        </div>
      )}
      {weather && weather.data && weather.data.main && (
        <div id="city-name" className="text-center">
          <h2>
            {weather.data.name}, <span>{weather.data.sys.country}</span>
          </h2>
          <div>
            <div id="date">
              <p>{toDateFunction()}</p>
            </div>
            <div id="icon-temp">
              <img
                src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                alt={weather.data.weather[0].description}
              />
              {Math.round(weather.data.main.temp)}
              <sup className="deg">°C</sup>
            </div>
          </div>
          <div id="des-wind">
            <p>{weather.data.weather[0].description.toUpperCase()}</p>
            <p>Wind Speed: {weather.data.wind.speed}m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
