import axios from "axios";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const regionUrl = (lat, lon) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

export const getWeather = (latlng) => {
  const [lat, lon] = latlng;

  return axios.get(regionUrl(lat, lon)).then((response) => response.data);
};
