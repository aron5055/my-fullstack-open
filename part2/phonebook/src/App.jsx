import { useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [filteredPersons, setFilteredPerons] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  const clearInput = () => {
    setNewName("");
    setNewNumber("");
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      clearInput();
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    setPersons(persons.concat(newPerson));
    setFilteredPerons(persons.concat(newPerson));
    clearInput();
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    const searchedText = event.target.value.toLowerCase();
    setSearchName(event.target.value);

    if (searchedText.length === 0) {
      setFilteredPerons(persons);
      return;
    }

    const searched = persons.filter((person) => {
      return person.name.toLowerCase().includes(searchedText);
    });

    setFilteredPerons(searched);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter name={searchName} onChange={handleSearch} />

      <h2>add a new</h2>

      <PersonForm
        name={newName}
        number={newNumber}
        handleName={handleNewName}
        handleNumber={handleNewNumber}
        onSubmit={addPerson}
      />

      <h2>Numbers</h2>

      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
