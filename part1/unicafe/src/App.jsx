import { useState } from "react";

const StatisticLine = ({text,value}) => {
  return(
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}
const Statistics = ({good,neutral,bad}) => {
  // console.log(good,neutral,bad)
  const total = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / total || 0;
  const positive = (good * 100) / total || 0;
  
  //check for any feedback and render appropiately
  if (total === 0)return <p>No feedback given</p>;
  return(
    <>
      <h2>Statistics</h2>

      <table>
        <tbody>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="all" value = {total}/>
          <StatisticLine text="average" value ={average}/>
          <StatisticLine text="positive" value ={` ${positive} %`}/>

        </tbody>
      </table>

    </>  
  )
}

const Button = ({func,text}) => <button onClick={func}>{text}</button>

const App = () => {
  //save clicks of each button to its own state
  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad,setBad] = useState(0)

  return (
    <>
      <h1>Give Feedback</h1>

      <Button func={()=>{setGood(good+1)}} text="Good"/>
      <Button func={()=>{setNeutral(neutral+1)}} text="Neutral"/>
      <Button func={()=>{setBad(bad+1)}} text="Bad"/>

      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
      
    </>
  )
}
export default App