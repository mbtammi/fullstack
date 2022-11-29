const Person = ({ person, handleClick }) => {
  return (
    <li>
      {person.name}, {person.number}{" "}
      <button onClick={handleClick}>Poistaminen</button>
    </li>
  );
};

export default Person;
