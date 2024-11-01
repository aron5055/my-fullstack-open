import { getCountry } from "../services/countries";
import { useState, useEffect } from "react";
import Weather from "./Weather";

const Country = ({ name }) => {
  if (!name) {
    return;
  }

  const [country, setCountry] = useState(null);

  useEffect(() => {
    getCountry(name).then((countryData) => {
      setCountry(countryData);
    });
  }, [name]);

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{name}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages: </h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${name}'s flag`} />
      <Weather name={country.capital} latlng={country.capitalInfo.latlng} />
    </div>
  );
};

const Countries = ({ searchItem, countires, setSearchItem }) => {
  const displayedCountries = countires.filter((country) =>
    country.toLowerCase().includes(searchItem.toLowerCase())
  );

  if (displayedCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (displayedCountries.length > 1) {
    return (
      <div>
        {displayedCountries.map((country) => {
          return (
            <p key={country}>
              {country}
              <button onClick={() => setSearchItem(country)}>show</button>
            </p>
          );
        })}
      </div>
    );
  } else if (displayedCountries.length === 1) {
    return <Country name={displayedCountries[0]} />;
  }
  return null;
};

export default Countries;
