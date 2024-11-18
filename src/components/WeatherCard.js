// import React from 'react';

// function WeatherCard({ data }) {
//     return (
//         <div className="weather-card">
//             <h2>Current Weather</h2>
//             <p>Temperature: {data.temp.toFixed(2)}°C</p>
//             <p>Min: {data.temp_min.toFixed(2)}°C / Max: {data.temp_max.toFixed(2)}°C</p>
//             <p>Humidity: {data.humidity}%</p>
//             <p>Wind Speed: {data.wind_speed} m/s</p>
//             <p>{data.description}</p>
//             <img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} alt="Weather icon" />
//         </div>
//     );
// }

// export default WeatherCard;

import React from "react";

function WeatherCard({ data, isCelsius }) {
  // Helper function to convert Celsius to Fahrenheit
  const convertToFahrenheit = (temp) => (temp * 9) / 5 + 32;

  return (
    <div className="weather-card">
      <h2 className="main-temp">
        {isCelsius
          ? `${data.temp.toFixed()}°C`
          : `${convertToFahrenheit(data.temp).toFixed()}°F`}
      </h2>

      <p
        style={{
          display: "flex",
          gap: "4px",
        }}
      >
        <span style={{

        }}>
          Min:
          {isCelsius
            ? `${data.temp_min.toFixed()}°C`
            : `${convertToFahrenheit(data.temp_min).toFixed()}°F`}
        </span>
        <span>
          Max:{" "}
          {isCelsius
            ? `${data.temp_max.toFixed()}°C`
            : `${convertToFahrenheit(data.temp_max).toFixed()}°F`}
        </span>
      </p>
      <p>Humidity: {data.humidity}%</p>
      <p>Wind Speed: {data.wind_speed} m/s</p>
      <p>{data.description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt="Weather icon"
      />
    </div>
  );
}

export default WeatherCard;
