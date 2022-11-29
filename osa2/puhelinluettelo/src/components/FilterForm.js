const FilterForm = ({ text, event }) => {
  return (
    <div>
      {text}
      <input onChange={event} />
    </div>
  );
};

export default FilterForm;
