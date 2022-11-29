import Maa from "./Maa";

const Sisalto = ({ maat, setMaat }) => {
  if (maat.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if ((maat.length > 2 && maat.length < 10) || maat.length === 0) {
    return (
      <ul>
        {maat.map((maa, i) => (
          <li key={i}>
            {" "}
            {maa.name.common}{" "}
            <button onClick={() => setMaat([maa])}>show</button>
          </li>
        ))}
      </ul>
    );
  } else {
    console.log(maat[0]);
    return <Maa maa={maat[0]} />;
    // <Country country={maat[0]} />;
  }
};

export default Sisalto;
