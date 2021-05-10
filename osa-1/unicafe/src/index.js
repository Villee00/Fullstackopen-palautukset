import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticLine = ({text, value}) =>{
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
 
}

const Statistics  = ({good, neutral, bad, all, average, positive}) => {
  if(all === 0){
    return(
      <tbody>
        <tr>
          <td>No feedback given</td>
        </tr>
      </tbody>
    )
  }
  
  return (
    <tbody>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </tbody>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const all = bad + good + neutral;
  const average = ((good - bad) / all).toFixed(1);
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => setGood(good+1)}/>
      <Button text="neutral"  handleClick={() => setNeutral(neutral+1)}/>
      <Button text="bad" handleClick={() => setBad(bad+1)}/>
      
      <h2>statistics</h2>
      <table>
        <Statistics good={good} 
        neutral={neutral}
        bad={bad} 
        gobadod={good} 
        all={all} 
        average={average} 
        positive={(good/(bad + good + neutral) * 100).toFixed(1) +"%"} />
      </table>
      
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)