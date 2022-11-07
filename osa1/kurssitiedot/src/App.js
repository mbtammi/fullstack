const Header = ({ kurssi }) => {
  return (
    <div>
      <h1> {kurssi} </h1>
    </div>
  );
};

const Total = ({ parts }) => {
  let a = parts[0].exercises + parts[1].exercises + parts[2].exercises;
  return (
    <div>
      <p>Number of exercises = {a}</p>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      <p>
        {parts[0].name} {parts[0].exercises}{" "}
      </p>
      <p>
        {parts[1].name} {parts[1].exercises}{" "}
      </p>
      <p>
        {parts[2].name} {parts[2].exercises}{" "}
      </p>
    </div>
  );
};

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
      <Header kurssi={course.name}></Header>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
