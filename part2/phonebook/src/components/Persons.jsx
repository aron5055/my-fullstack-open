const Record = ({ id, name, number, handleDelete }) => {
  return (
    <p>
      {name} {number} &nbsp;
      <button onClick={() => handleDelete(id, name)}>delete</button>
    </p>
  );
};

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <Record
          key={person.id}
          id={person.id}
          name={person.name}
          number={person.number}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Persons;
