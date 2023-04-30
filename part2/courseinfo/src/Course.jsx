export function Course({ courses }) {
  return (
    <>
      <Header course={courses.name} />
      <Content parts={courses.parts} />
      <Total parts={courses.parts} />

    </>
  );
}

function Header({ course }) {
  return <h1>{course}</h1>;
}

function Content({ parts }) {
  const listParts = parts.map((part) => <Part key={part.id} part={part} />);
  return <ul>{listParts}</ul>;
}

function Part({ part }) {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
}

function Total({ parts }) {
    const total = parts.reduce((sum, part) => {
        console.log("reduce", sum);
        return sum + part.exercises
    }, 0)
  return <p>Number of exercises {total}</p>;
}