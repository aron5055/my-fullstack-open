import { useEffect, useState } from "react";
import { getWeather } from "../services/weather";

const Weather = ({ name, latlng }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getWeather(latlng).then((data) => {
      console.log(data);
      setWeather(data);
    });
  }, [latlng]);

  if (!weather) {
    return;
  }

  const url = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  return (
    <div>
      <h2>Weather in {name}</h2>
      <p>temperature {weather.main.temp} Celcius</p>
      <img src={url} alt={weather.weather[0].description} />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
