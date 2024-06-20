import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const score = {
    good: 1,
    neutral: 0,
    bad: -1,
  };
  const total = good + neutral + bad;

  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }

  const scores =
    good * score["good"] + neutral * score["neutral"] + bad * score["bad"];
  const positive = ((good / total) * 100).toFixed(2) + "%";
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={(scores / total).toFixed(2)} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onFeekback = (text) => {
    switch (text) {
      case "good":
        return () => setGood(good + 1);
      case "neutral":
        return () => setNeutral(neutral + 1);
      case "bad":
        return () => setBad(bad + 1);
    }
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={onFeekback("good")} text="good" />
      <Button onClick={onFeekback("neutral")} text="neutral" />
      <Button onClick={onFeekback("bad")} text="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
