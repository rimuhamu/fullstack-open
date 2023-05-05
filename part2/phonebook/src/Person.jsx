export function Person({ person, deletePerson }) {
    return (
      <>
        <p>{person.name}</p>
        <p>{person.number}</p>
        <button type="submit" onClick={deletePerson}>Delete</button>
      </>
    );
  }