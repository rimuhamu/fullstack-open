export function Part(props) {
  console.log(props)
  return (

      <p>
        {props.name} {props.exercises}
      </p>

  );
}
