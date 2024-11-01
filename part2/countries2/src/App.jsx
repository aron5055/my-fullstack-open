import { useEffect, useState } from "react";
import { getAll } from "./services/countries";
import Countries from "./components/Countries";

function App() {
  const [searchItem, setSearchItem] = useState("");
  const [countries, setCountires] = useState([]);

  useEffect(() => {
    getAll().then((allCountries) => {
      const names = allCountries.map((country) => country.name.common);
      setCountires(names);
    });
  }, []);

  const handleSearch = (event) => {
    setSearchItem(event.target.value);
  };

  return (
    <div className="main">
      <p>
        find countires
        <input value={searchItem} onChange={handleSearch}></input>
      </p>
      <Countries
        searchItem={searchItem}
        countires={countries}
        setSearchItem={setSearchItem}
      />
    </div>
  );
}

export default App;
