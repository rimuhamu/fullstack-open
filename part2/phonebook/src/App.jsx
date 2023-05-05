import { useState, useEffect } from "react";
import { Person } from "./Person";
import { PersonForm } from "./PersonForm";
import personService from "./services/persons";
import { Notification } from "./Notification";
import "./index.css";

export default function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [addedMessage, setAddedMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initalPersons) => {
      setPersons(initalPersons);
    });
  }, [persons]);

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
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
        })
        .then(() => {
          setAddedMessage(
            ` Added ${newName}`
          );
          setTimeout(() => {
            setAddedMessage(null);
          }, 5000);
        })
    }
  }

  function addPerson(event) {
    event.preventDefault();
    checkName();

    setNewName("");
    setNewNumber("");
  }

  function deletePerson(person) {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personService.removePerson(person.id).then((deletedPersons) => {
        setPersons(deletedPersons);
      });
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedMessage} />
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
          <Person
            key={person.id}
            person={person}
            deletePerson={() => deletePerson(person)}
          />
        ))}
      </ul>
    </div>
  );
}
