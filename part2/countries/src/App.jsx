import { useState, useEffect } from "react";
import countryService from "./services/country";
import "./App.css";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";

function App() {
  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState("");

  const matchName = (country, name) => {
    return country.name.common.toLowerCase().includes(name.toLowerCase());
  };

  useEffect(() => {
    countryService
      .getAll()
      .then((data) => {
        setCountries(data);
      })
      .catch((err) => {
        console.log("failed to get all country.");
      });
  }, []);

  const onInput = (event) => {
    setInput(event.target.value);
  };

  const matchedCountry = countries.filter((c) => matchName(c, input));

  return (
    <>
      <SearchBar input={input} onInput={onInput} />
      <SearchResult countries={matchedCountry} showCountry={setInput} />
    </>
  );
}

export default App;
