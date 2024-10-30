const Header = ({ name }) => <h1>{name}</h1>;

const Parts = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(({ name, exercises }, i) => (
        <Parts key={i} name={name} exercises={exercises} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => (
  <p>Number of exercises {parts.reduce((a, b) => a + b.exercises, 0)}</p>
);

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default App;
