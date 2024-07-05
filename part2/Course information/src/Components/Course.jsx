const Course = ({course}) => {
    const totalExercises = course.parts.reduce((total,part) => total + part.exercises , 0 );
    return (
        <>
        <Header courseName={course.name}/>
        <Content parts={course.parts}/>
        <Total sumofExercices={totalExercises}/>
        </>
    )
}
const Header = ({courseName}) => <h1>{courseName}</h1>

const Content = ({parts}) => {
  //console.log(props.parts)
  return (
    <>
      {/* TODO : ======================  Remove index as key */}
      {parts.map((part,index) => (
        <Part key={index} part = {part.name} exercises = {part.exercises}/>
      ))}
    </>
  )
}
const Part = ({part,exercises}) => <p>{part} {exercises}</p>

const Total = ({sumofExercices}) => <h4>Total of {sumofExercices} exercises</h4>

export default Course