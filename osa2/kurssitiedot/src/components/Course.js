import Part from "./Part";

const Header = ({ kurssi }) => {
  return (
    <div>
      <h2> {kurssi} </h2>
    </div>
  );
};

const Total = ({ parts }) => {
  const sum = parts.reduce(
    (previousValue, currentValue) => previousValue + currentValue.exercises,
    0
  );
  return (
    <div>
      <h4>Total of {sum} exercises</h4>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((osa) => (
        <Part key={osa.id} part={osa.name} exercises={osa.exercises} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header kurssi={course.name} />
      <Content parts={course.parts}></Content>
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
