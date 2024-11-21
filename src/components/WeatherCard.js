import React from "react";

function WeatherCard({ data, isCelsius }) {
  const convertToFahrenheit = (temp) => (temp * 9) / 5 + 32;
  // convert Celsius to Fahrenheit

  return (
    <div className="weather-card">
      <h2 style={{ textAlign: "center" }}>{data.city}</h2>
      <img 
        className="image-sixe"
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt="Weather icon"
      />

      <h2 className="main-temp">
        {isCelsius
          ? `${data.temp.toFixed()}°C`
          : `${convertToFahrenheit(data.temp).toFixed()}°F`}
      </h2>

      <p
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span
          className="forecast-card"
          style={{
            padding: "2px",
          }}
        >
          Min:
          {isCelsius
            ? `${data.temp_min.toFixed()}°C`
            : `${convertToFahrenheit(data.temp_min).toFixed()}°F`}
        </span>
        <span
          className="forecast-card"
          style={{
            padding: "2px",
          }}
        >
          Max:{" "}
          {isCelsius
            ? `${data.temp_max.toFixed()}°C`
            : `${convertToFahrenheit(data.temp_max).toFixed()}°F`}
        </span>
      </p>
      <p>Humidity: {data.humidity}%</p>
      <p>Wind Speed: {data.wind_speed} m/s</p>
      <p>{data.description}</p>
    </div>
  );
}

export default WeatherCard;
