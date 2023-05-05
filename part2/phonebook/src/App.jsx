import { useState, useEffect } from "react";
import { Person } from "./Person";
import { PersonForm } from "./PersonForm";
import personService from "./services/persons";

export default function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "491632930" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    personService.getAll().then(initalPersons => {
      setPersons(initalPersons)
    });
  }, []);

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
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      });
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
