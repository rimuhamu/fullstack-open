import { useState } from "react";

function Person({ person }) {
  return (
    <>
      <p>{person.name}</p>
      <p>{person.number}</p>
    </>
  );
}

export default function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "491632930" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  function handleNameChange(event) {
    setNewName(event.target.value);
  }

  function handleNumberChange(event) {
    setNewNumber(event.target.value);
  }

  function checkName() {
    if (persons.find((person) => person.name === newName)) {
      window.alert(`${newName} is already in phonebook.`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(personObject));
    }
  }

  function addPerson(event) {
    event.preventDefault();
    checkName();

    setNewName("");
    setNewNumber("");
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person key={person.name} person={person} />
        ))}
      </ul>
    </div>
  );
}
