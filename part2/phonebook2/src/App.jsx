import { useState, useEffect } from "react";
import personService from "./services/persons";

import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";

const Filter = ({ searchText, onSearch }) => {
  return (
    <div>
      filter shown with
      <input value={searchText} onChange={onSearch} />
    </div>
  );
};

const Notification = ({ message }) => {
  if (!message) {
    return null;
  }
  return (
    <div className={`notification ${message.error ? "error" : "message"}`}>
      {message.content}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((p) => setPersons(p));
  }, []);

  const filteredPersons = persons.filter((person) => {
    return person.name.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter
        searchText={searchText}
        onSearch={(event) => setSearchText(event.target.value)}
      />
      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
      />
      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons}
        setPersons={setPersons}
        setMessage={setMessage}
      />
    </div>
  );
};

export default App;
