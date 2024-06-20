const SearchBar = ({ input, onInput }) => {
  return (
    <div>
      find countries &nbsp;
      <input value={input} onChange={onInput} />
    </div>
  );
};

export default SearchBar;
