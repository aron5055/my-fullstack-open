import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const WeatherInfo = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const { capital, capitalInfo } = country;
  const city = capital[0];
  const [lat, lon] = capitalInfo.latlng;

  useEffect(() => {
    weatherService.getWeather(lat, lon).then((weather) => {
      setWeather(weather.current);
    });
  }, [lat, lon]);

  if (!weather) {
    return <></>;
  } else {
    return (
      <div>
        <h2>Weather in {city}</h2>
        <p>temperature {(weather.temp - 273.15).toFixed(2)} Celcius</p>
        <img
          src={weatherService.getWeatherIconUrl(weather["weather"][0]["icon"])}
          alt="weather icon"
        />
        <p>wind {weather["wind_speed"]} m/s</p>
      </div>
    );
  }
};

export default WeatherInfo;
