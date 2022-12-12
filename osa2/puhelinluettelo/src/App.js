import { useState, useEffect } from "react";
import FilterForm from "./components/FilterForm";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import Notification from "./components/Notification";

import puhelinPalvelu from "./services/numbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(persons);
  const [message, setMessage] = useState(null);
  const [messageStyle, setMessageStyle] = useState("notif");

  useEffect(() => {
    puhelinPalvelu.getAll().then((initialNumbers) => {
      setPersons(initialNumbers);
      setShowAll(initialNumbers);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setShowAll(
      persons.filter((person) => person.name.includes(event.target.value))
    );
  };

  function userExists(name) {
    return persons.some(function (el) {
      return el.name === name;
    });
  }

  function giveMeIdOf(name) {
    const founded = persons.find((element) => element.name === name);
    return founded.id;
  }

  const addPerson = (event) => {
    event.preventDefault();

    const nameObjekti = {
      name: newName,
      number: newNumber,
    };

    if (userExists(newName)) {
      if (
        window.confirm(
          newName +
            " is already added to phonebook, replace the old number with a new one?"
        )
      ) {
        puhelinPalvelu
          .update(giveMeIdOf(newName), nameObjekti)
          .then((returnedObjekt) => {
            console.log(`${returnedObjekt.name} successfully updated`);
            puhelinPalvelu.getAll().then((initialNumbers) => {
              setShowAll(initialNumbers);
            });

            setNewName("");
            setNewNumber("");
            setMessage(`${nameObjekti.name} was successfully updated`);
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          });
      }
    } else {
      puhelinPalvelu
        .create(nameObjekti)
        .then((returnedObjekti) => {
          setPersons(persons.concat(returnedObjekti));
          setShowAll(persons.concat(returnedObjekti));
          setMessage(`${nameObjekti.name} was successfully added`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        })
        .catch((error) => {
          // pääset käsiksi palvelimen palauttamaan virheilmoitusolioon näin
          setMessageStyle("error");
          setMessage(
            `Name ${nameObjekti.name} or Number ${nameObjekti.number} is invalid.`
          );
          setTimeout(() => {
            setMessageStyle("notif");
            setMessage(null);
          }, 4000);
          console.log(error.response.data);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const handlePoistaminen = (event) => {
    const filteredPerson = showAll.filter((person) => person.id === event);

    if (window.confirm("Delete " + filteredPerson[0].name)) {
      puhelinPalvelu
        .remove(event)
        .then((uudet) => {
          setPersons(persons.filter((person) => person.id !== event));
          puhelinPalvelu.getAll().then((initialNumbers) => {
            setShowAll(initialNumbers);
          });
          setMessage(`${filteredPerson[0].name} was successfully deleted`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        })
        .catch((error) => {
          setMessageStyle("error");
          setMessage(
            `${filteredPerson[0].name} was already removed from the server, Refresh`
          );
          setTimeout(() => {
            setMessage(null);
            setMessageStyle("notif");
          }, 3000);
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} style={messageStyle} />

      <FilterForm text="filter shown with " event={handleFilter} />

      <h1>add a new</h1>
      <form>
        <PersonForm
          text={"name: "}
          value={newName}
          onChange={handleNameChange}
        />
        <PersonForm
          text={"number: "}
          value={newNumber}
          onChange={handleNumberChange}
        />
        <div>
          <button type="submit" onClick={addPerson}>
            add
          </button>
        </div>
      </form>
      <h1>Numbers</h1>

      <ul>
        {showAll.map((person) => (
          <Person
            key={person.id}
            person={person}
            handleClick={() => handlePoistaminen(person.id)}
          ></Person>
        ))}
      </ul>
    </div>
  );
};

export default App;
