import { useState, useEffect } from "react";
import countryService from "./services/country";
import "./App.css";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";

function App() {
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [input, setInput] = useState("");

  const matchName = (country, name) => {
    const countryName = country.name;
    const attrs = ["common", "official"];
    return attrs.some((attr) => countryName[attr].toLowerCase().includes(name));
  };

  useEffect(() => {
    countryService
      .getAll()
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((err) => {
        console.log("failed to get all country.");
      });
  }, []);

  useEffect(() => {
    if (!countries) {
      return;
    }
    const filtered = countries.filter((country) =>
      matchName(country, input.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [input]);

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const showCountry = (country) => {
    setFilteredCountries([country]);
  };

  return (
    <>
      <SearchBar input={input} handleInput={handleInput} />
      <SearchResult countries={filteredCountries} handleShow={showCountry} />
    </>
  );
}

export default App;
