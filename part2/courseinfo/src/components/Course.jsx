import Content from "./Content";

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Footer = ({ parts }) => {
  const total = parts.reduce((a, b) => a + b.exercises, 0);
  return <p>total of {total} exercises</p>;
};

const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Footer parts={parts} />
    </div>
  );
};

export default Course;
