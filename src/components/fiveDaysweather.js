import React from "react";

function Daily({ data, isCelsius }) {
  // Helper function to convert Celsius to Fahrenheit
  const convertToFahrenheit = (temp) => (temp * 9) / 5 + 32;

  return (
    <div className="forecast-card">
      <h4>{data.day}</h4> {/* Display day name */}
      <p>
        {isCelsius
          ? `${data.temperature.toFixed()}°C`
          : `${convertToFahrenheit(data.temperature).toFixed()}°F`}
      </p>
      <img
        src={`https://openweathermap.org/img/wn/${data.weatherIcon}@2x.png`}
        alt="Weather Icon"
      />
    </div>
  );
}

export default Daily;


