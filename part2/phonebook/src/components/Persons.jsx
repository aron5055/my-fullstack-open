const Record = ({ name, number }) => {
  return (
    <p>
      {name} {number}
    </p>
  );
};

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <Record key={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default Persons;
