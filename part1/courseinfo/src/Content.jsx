import { Part } from "./Part";

export function Content(props){
    console.log(props)
    return (
    <>
        <Part name={props.course.parts[0].name} exercises={props.course.parts[0].exercises}/>
        <Part name={props.course.parts[1].name} exercises={props.course.parts[1].exercises}/>
        <Part name={props.course.parts[2].name} exercises={props.course.parts[2].exercises}/>
    </>
    )
}