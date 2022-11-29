import "../index.css";

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "Poista tärkeys" : "tee tärkeä";

  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
