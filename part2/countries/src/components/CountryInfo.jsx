const CountryInfo = ({ country }) => {
  const { name, capital, area, languages, flags } = country;

  return (
    <div>
      <h1>{name.common}</h1>
      <p>capital {capital[0]}</p>
      <p>area {area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flags.png} alt={`${name.common}'s flag`} />
    </div>
  );
};

export default CountryInfo;
