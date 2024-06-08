const Filter = ({ name, onChange }) => {
  return (
    <div>
      filter shown with
      <input value={name} onChange={onChange} />
    </div>
  );
};

export default Filter;
