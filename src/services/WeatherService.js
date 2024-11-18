import axios from "axios";



export const getCurrentWeather = async (city) => {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;
  const response = await axios.get(`${API_URL}`, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
    },
  });
  console.log("response :", response);

  return response.data;
};






