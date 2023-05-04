import { useState } from "react";
import { Person } from "./Person";
import { PersonForm } from "./PersonForm";

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
        number: newNumber,
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
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person key={person.name} person={person} />
        ))}
      </ul>
    </div>
  );
}
