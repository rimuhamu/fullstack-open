import { useState } from "react";

export default function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function Statistics({ good, neutral, bad }) {
    const total = good + neutral + bad;
    const average = (good - bad) / total;
    const percentage = (good / total) * 100;


    if (total === 0) {
      return <p>No feedback given</p>;
    }
    return (
      <>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="total" value={total} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="percentage of positive %" value={percentage} />
      </>
    );
  }

  function StatisticsLine(props) {
    return (
      <p>
        {props.text} {props.value}
      </p>
    );
  }

  function Button({ handleClick, text }) {
    return <button onClick={handleClick}>{text}</button>;
  }

  function handleGoodClick() {
    setGood(good + 1);
    console.log(good);
  }

  function handleNeutralClick() {
    setNeutral(neutral + 1);
    console.log(neutral);
  }

  function handleBadClick() {
    setBad(bad + 1);
    console.log(bad);
  }
  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />

      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}
