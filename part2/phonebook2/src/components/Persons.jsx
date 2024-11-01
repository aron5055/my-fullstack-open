import personService from "../services/persons";

const Person = ({ person, persons, setPersons, setMessage }) => {
  const handleDelte = () => {
    if (confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(person.id)
        .then((deleted) => {
          setPersons(persons.filter((p) => p.id !== deleted.id));
        })
        .catch((error) => {
          setMessage({
            content: `Information of ${person.name} has already been removed from server`,
            error: true,
          });
          setPersons(persons.filter((p) => p.id !== person.id));
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
  };

  return (
    <p>
      {person.name} {person.number} <span></span>
      <button onClick={handleDelte}>delete</button>
    </p>
  );
};

const Persons = ({ persons, setPersons, setMessage }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person
          key={person.id}
          person={person}
          persons={persons}
          setPersons={setPersons}
          setMessage={setMessage}
        />
      ))}
    </div>
  );
};

export default Persons;
