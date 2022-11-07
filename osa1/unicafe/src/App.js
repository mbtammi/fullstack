import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}> {text} </button>;
};

const StatisticLine = (props) => {
  if (props.allClicks === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <tbody>
      <tr>
        <td>{props.nimi}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  );
};

const Statistics = (props) => {
  const hyva = props.good;
  const neutraali = props.neutral;
  const huono = props.bad;
  const kaikki = props.allClicks;

  if (props.allClicks === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <div>
      <StatisticLine nimi={"good"} value={hyva}></StatisticLine>
      <StatisticLine nimi={"neutral"} value={neutraali}></StatisticLine>
      <StatisticLine nimi={"bad"} value={huono}></StatisticLine>
      <StatisticLine nimi={"all"} value={kaikki}></StatisticLine>
      <StatisticLine nimi={"average"} value={kaikki / 3}></StatisticLine>
      <StatisticLine
        nimi={"positive"}
        value={(hyva / kaikki) * 100 + " %"}
      ></StatisticLine>
    </div>
  );
};

const App = (props) => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAll] = useState(0);

  const handleGoodClick = () => {
    setAll(allClicks + 1);
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setAll(allClicks + 1);
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setAll(allClicks + 1);
    setBad(bad + 1);
  };

  return (
    <>
      <div>
        <h1>Give feedback</h1>
        <Button handleClick={handleGoodClick} text="good"></Button>
        <Button handleClick={handleNeutralClick} text="neutral"></Button>
        <Button handleClick={handleBadClick} text="bad"></Button>

        <h1>statistics</h1>
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          allClicks={allClicks}
        ></Statistics>
      </div>
    </>
  );
};

export default App;
