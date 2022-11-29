import axios from "axios";
import { useState, useEffect } from "react";
import Sisalto from "./components/Sisalto";

function App() {
  const [maat, setMaat] = useState([]);
  const [naytaMaat, setNaytaMaat] = useState(maat);
  const [filtteri, setFiltteri] = useState("");

  const etsiMaa = (event) => {
    setFiltteri(event.target.value);
    if (filtteri) {
      const regex = new RegExp(filtteri, "i");
      const filteredCountries = () =>
        maat.filter((maa) => maa.name.common.match(regex));
      setNaytaMaat(filteredCountries);
    }
  };

  const hook = () => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setMaat(response.data);
    });
  };

  console.log("render", maat.length, "countries");
  console.log(maat);

  useEffect(hook, []);

  return (
    <div>
      Find countries <input onChange={etsiMaa} />
      <Sisalto maat={naytaMaat} setMaat={setNaytaMaat}></Sisalto>
    </div>
  );
}

export default App;
