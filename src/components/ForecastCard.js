import React from "react";

function ForecastCard({ data, isCelsius }) {
  // Helper function to convert Celsius to Fahrenheit
  const convertToFahrenheit = (temp) => (temp * 9) / 5 + 32;

  return (
    <div className="forecast-card">
      <b>{new Date(data.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</b>
      <p>
        {isCelsius
          ? `${data.temperature.toFixed()}°C`
          : `${convertToFahrenheit(data.temperature).toFixed()}°F`}
      </p>
      <p className="description">{data.description}</p>
      <img className="icon-img"
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt="Weather icon"
      />
    </div>
  );
}

export default ForecastCard;
