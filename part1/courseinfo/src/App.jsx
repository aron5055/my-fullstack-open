const Header = (props) => <h1>{props.course}</h1>;

const Parts = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
);

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part, i) => (
        <Parts key={i} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = (props) => (
  <p>Number of exercises {props.parts.reduce((a, b) => a + b.exercises, 0)}</p>
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
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
