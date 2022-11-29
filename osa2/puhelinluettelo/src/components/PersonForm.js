const PersonForm = ({ text, value, onChange }) => {
  return (
    <div>
      {text}
      <input value={value} onChange={onChange} />
    </div>
  );
};

export default PersonForm;
