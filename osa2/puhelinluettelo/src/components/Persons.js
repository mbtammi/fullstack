const Persons = ({ showWho, handlePoista }) => {
  return (
    <ul>
      {showWho.map((person) => (
        <li key={person.name}>
          {person.name}, {person.number}{" "}
          {/* {<button onClick={() => handlePoista(person.id)}>poista</button>} */}
        </li>
      ))}
    </ul>

    //   <div>
    //     {text}
    //     <input value={value} onChange={onChange} />
    //   </div>
  );
};

export default Persons;
