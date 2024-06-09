import { useState, useEffect } from "react";
import personService from "./services/persons";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [filteredPersons, setFilteredPerons] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [message, setMessage] = useState("");
  const [errorState, setErrorState] = useState(false);

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
      setFilteredPerons(persons);
    });
  }, []);

  const clearInput = () => {
    setNewName("");
    setNewNumber("");
  };

  const displayError = (msg) => {
    setErrorState(true);
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  const displayMsg = (msg) => {
    setErrorState(false);
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  const updatePersons = (persons) => {
    setPersons(persons);
    setFilteredPerons(persons);
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const p = persons.find((p) => p.name === newName);
    if (!p) {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personService.create(newPerson).then((returnedPerson) => {
        updatePersons(persons.concat(returnedPerson));
        clearInput();
      });

      displayMsg(`Added ${newPerson.name}`);
    } else if (p.number === newNumber) {
      alert(`${newName} is already added to phonebook`);
      clearInput();
      return;
    } else {
      personService
        .update(p.id, { ...p, number: newNumber })
        .then((returnedPerson) => {
          updatePersons(
            persons.map((person) =>
              person.id !== returnedPerson.id ? person : returnedPerson
            )
          );

          displayMsg(`Changed ${returnedPerson.name}'s number`);
        })
        .catch((error) => {
          displayError(
            `Information of ${p.name} has already been removed from server`
          );
        });
    }
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

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      const newPersons = persons.filter((person) => person.id !== id);

      personService.deletePerson(id).then((returnedPerson) => {
        updatePersons(newPersons);
      });

      displayMsg(`Deleted ${name}`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={errorState} />

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

      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
