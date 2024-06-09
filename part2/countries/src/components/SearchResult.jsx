import CountryInfo from "./CountryInfo";
import WeatherInfo from "./WeatherInfo";

const SearchResult = ({ countries, handleShow }) => {
  if (!countries || countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    return (
      <>
        <CountryInfo country={countries[0]} />
        <WeatherInfo country={countries[0]} />
      </>
    );
  } else if (countries.length === 0) {
    return <p>No matches found.</p>;
  } else {
    return (
      <div>
        {countries.map((country) => {
          return (
            <p key={country["ccn3"]}>
              {country.name.common}
              <button onClick={() => handleShow(country)}>show</button>
            </p>
          );
        })}
      </div>
    );
  }
};

export default SearchResult;
