import React, { useState } from "react";
import {
  getCurrentWeather,
  //getfiveDaysweather,
} from "../services/WeatherService";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";
import Daily from "../components/fiveDaysweather";

function Home() {
  const [city, setCity] = useState("japan");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [fiveDaysweather, setfiveDaysweather] = useState([]);
  const [error, setError] = useState("");
  const [isCelsius, setIsCelsius] = useState(true);

  const handleSearch = async () => {
    try {
      setError("");
      const data = await getCurrentWeather(city);
      const weatherData = data;
      const forecastData = data;

      //const fiveDaysweatherData = await getfiveDaysweather(city);

      setCurrentWeather({
        temp: weatherData.list[0].main.temp,
        temp_min: weatherData.list[0].main.temp_min,
        temp_max: weatherData.list[0].main.temp_max,
        humidity: weatherData.list[0].main.humidity,
        wind_speed: weatherData.list[0].main.sea_level,
        description: weatherData.list[0].weather[0].description,
        icon: weatherData.list[0].weather[0].icon,
      });

      console.log("Forecast Dta : ", forecastData);
      const uniqueTemperatures = getUniqueDayTemperatures(forecastData.list);
      uniqueTemperatures.pop();
      console.log(uniqueTemperatures);
      setfiveDaysweather(uniqueTemperatures);

      const forecastList = forecastData.list.slice(0, 5).map((item) => ({
        date: item.dt_txt,
        temperature: item.main.temp,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      }));
      setForecast(forecastList);
    } catch (error) {
      console.log("Error : ", error);

      setError("City not found or an error occurred.");
    }
  };

  // const toggleUnits = () => {
  //   setIsCelsius(!isCelsius);
  //   setCurrentWeather((prevWeather) => {
  //     const factor = isCelsius ? 9 / 5 + 32 : 5 / 9 - 32; // convert celsius to fahrenheit
  //     return {
  //       ...prevWeather,
  //       temp: prevWeather.temp * factor,
  //       temp_min: prevWeather.temp_min * factor,
  //       temp_max: prevWeather.temp_max * factor,
  //     };
  //   });
  // };

  const toggleUnits = () => {
    setIsCelsius(!isCelsius);

    // Convert current weather

    // setCurrentWeather((prevWeather) => ({
    //     ...prevWeather,
    //     temp: isCelsius
    //         ? (prevWeather.temp * 9) / 5 + 32
    //         : ((prevWeather.temp - 32) * 5) / 9,
    //     temp_min: isCelsius
    //         ? (prevWeather.temp_min * 9) / 5 + 32
    //         : ((prevWeather.temp_min - 32) * 5) / 9,
    //     temp_max: isCelsius
    //         ? (prevWeather.temp_max * 9) / 5 + 32
    //         : ((prevWeather.temp_max - 32) * 5) / 9,
    // }));

    // Convert forecast temperatures
    // setForecast((prevForecast) =>
    //     prevForecast.map((item) => ({
    //         ...item,
    //         temperature: isCelsius
    //             ? (item.temperature * 9) / 5 + 32
    //             : ((item.temperature - 32) * 5) / 9,
    //     }))
    // );

    // Convert 5-day forecast temperatures
    setfiveDaysweather((prevFiveDays) =>
      prevFiveDays.map((item) => ({
        ...item,
        temperature: isCelsius
          ? (item.temperature * 9) / 5 + 32
          : ((item.temperature - 32) * 5) / 9,
      }))
    );
  };

  //------------------
  function getUniqueDayTemperatures(weatherData) {
    const uniqueDays = {};

    weatherData.forEach((entry) => {
      // Extract the date (YYYY-MM-DD) from dt_txt
      const date = entry.dt_txt.split(" ")[0];

      // If the date is not already in the uniqueDays object, add it
      if (!uniqueDays[date]) {
        // Convert date to a day name (e.g., Monday)
        const dayName = new Date(date)
          .toLocaleDateString("en-US", { weekday: "long" })
          .slice(0, 3); // Get first 3 characters of the day name

        uniqueDays[date] = {
          day: dayName, // Add shortened day name
          temperature: entry.main.temp,
          weatherIcon: entry.weather[0].icon,
        };
      }
    });

    // Convert the uniqueDays object to an array of results
    return Object.entries(uniqueDays).map(([date, data]) => ({
      day: data.day, // Use shortened day name
      temperature: data.temperature,
      weatherIcon: data.weatherIcon,
    }));
  }

  //======
  return (
    <div className="home brd">
      <h1>Weather Forecast Dashboard</h1>
      <div className="box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn" onClick={handleSearch}>
          Search
        </button>
        <button className="btn" onClick={toggleUnits}>
          {isCelsius ? "Fahrenheit" : "Celsius"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      {currentWeather && (
        <div className="w-card">
          <WeatherCard data={currentWeather} isCelsius={isCelsius} />

          <div className="forcast-wrapper">
            <div className="forecast">
              <h3 style={{ textAlign: "left" }}>Hourly Weather Forecast </h3>
              <div className="f-card-wrapper">
                {forecast.map((item, index) => (
                  <ForecastCard key={index} data={item} isCelsius={isCelsius} />
                ))}
              </div>
            </div>

            <div className="forecast">
              <h3 style={{ textAlign: "left" }}>5 dyas Weather Forecast </h3>
              <div className="f-card-wrapper">
                {fiveDaysweather.map((item, index) => (
                  <Daily key={index} data={item} isCelsius={isCelsius} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
