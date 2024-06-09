import axios from "axios";

const apiKey = import.meta.env.VITE_SOME_KEY;

const baseUrl = "https://api.openweathermap.org/data/3.0/onecall?";
const exclude = "minutely,hourly";

const getWeather = (lat, lon) => {
  const url = `${baseUrl}&lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${apiKey}`;
  return axios.get(url).then((response) => response.data);
};

const getWeatherIconUrl = (icon) => {
  const url = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  return url;
};

export default { getWeather, getWeatherIconUrl };
