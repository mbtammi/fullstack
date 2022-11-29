const Person = ({ person, handleClick }) => {
  return (
    <li>
      {person.name}, {person.number}{" "}
      <button onClick={handleClick}>testiPoisto</button>
    </li>
  );
};

export default Person;
