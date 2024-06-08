const PersonForm = (props) => {
  const { name, number, handleName, handleNumber, onSubmit } = props;

  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={handleName} />
      </div>
      <div>
        number: <input value={number} onChange={handleNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
