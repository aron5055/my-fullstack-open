const SearchBar = ({ input, handleInput }) => {
  return (
    <div>
      find countries &nbsp;
      <input value={input} onChange={handleInput} />
    </div>
  );
};

export default SearchBar;
