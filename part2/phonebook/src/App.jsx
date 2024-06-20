import { useState, useEffect } from "react";
import personService from "./services/persons";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [message, setMessage] = useState("");
  const [errorState, setErrorState] = useState(false);

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
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
  };

  const onNewName = (event) => {
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
      });

      displayMsg(`Added ${newPerson.name}`);
    } else if (p.number === newNumber) {
      alert(`${newName} is already added to phonebook`);
      return;
    } else {
      const ok = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (ok) {
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
    }

    clearInput();
  };

  const onNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const onSearch = (event) => {
    setSearchName(event.target.value);
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

  const personsToShow = searchName
    ? persons.filter((p) =>
        p.name.toLowerCase().includes(searchName.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={errorState} />

      <Filter name={searchName} onChange={onSearch} />

      <h2>add a new</h2>

      <PersonForm
        name={newName}
        number={newNumber}
        handleName={onNewName}
        handleNumber={onNewNumber}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>

      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
