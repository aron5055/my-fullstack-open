import { useState } from "react";
import personService from "../services/persons";

const PersonForm = ({ persons, setPersons, setMessage }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    if (newName === "") {
      alert("You must enter a name.");
      return;
    }

    const person = persons.filter((person) => person.name === newName);
    if (person.length !== 0) {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const p = person[0];
        const newPerson = {
          ...p,
          number: newNumber,
        };
        personService
          .update(p.id, newPerson)
          .then((modified) =>
            setPersons(
              persons.map((person) =>
                person.id === modified.id ? modified : person
              )
            )
          );
        return;
      }
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(newPerson)
      .then((created) => setPersons([...persons, created]));

    setMessage({
      content: `Added ${newName}`,
      error: false,
    });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name:
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
