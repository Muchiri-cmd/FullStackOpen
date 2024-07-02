//import { useState } from 'react'
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const totalExercises = course.parts.reduce((total,part) => total + part.exercises , 0 );
  return (
    <div>
      <Header name = {course.name}/>
      <Content parts = {course.parts}/>
      <Total totalExercises = {totalExercises} />
    </div>
  )
}
const Header = (props) => {
    return (
      <>
        <h1>{props.name}</h1>
      </>
    )
}

const Part = (props) => {
  return (
      <p>
        {props.part} {props.exercises}
      </p>
  )
}

const Content = (props) => {
  //console.log(props.parts)
  return (
    <>
      {props.parts.map((part,index) => (
        <Part key={index} part = {part.name} exercises = {part.exercises}/>
      ))}
    </>
  )
}

const Total = (props) => {
  return (
       <p>Number of exercises {props.totalExercises}</p>
  )
}
export default App
