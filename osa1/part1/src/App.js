import { useState } from "react";

const Display = ({ counter }) => {
  return <div>{counter}</div>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}> {text} </button>;
};

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by painamalla näppäimiä</div>;
  }
  return <div>button press historia: {props.allClicks.join(" ")}</div>;
};

const App = (props) => {
  const [value, setValue] = useState(10);

  const setToValue = (newValue) => () => {
    console.log("value now", newValue); // tulostetaan uusi arvo konsoliin
    setValue(newValue);
  };

  return (
    <div>
      {value}
      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  );
};

export default App;
