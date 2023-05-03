import { useState } from "react";

function Person({ person }) {
  return <p>{person.name}</p>
}

export default function App() {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  function handleNameChange(event) {
    setNewName(event.target.value);
  }

  function checkName() {
    /**
     * ! newName is a string while person.name is inside every element
     *   
     * */
    if(persons.find(person => person.name === newName)){ 
      window.alert(`${newName} is already in phonebook.`)      
      
    }
    else{
      const personObject = {
        name: newName,
      };
      setPersons(persons.concat(personObject));
      console.log(persons)
      console.log(newName)
    }
  };

  function addPerson(event) {
    event.preventDefault()
    checkName()
    
    setNewName("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
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
