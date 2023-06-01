import { useState } from 'react'

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  
  return (
  <div>
    <h1>statistics</h1>
    <p>
      good {good} <br />
      neutral {neutral} <br />
      bad {bad} <br />
      all {good + neutral + bad} <br />
      average {(good - bad) / (good + neutral + bad)} <br />
      positive {good / (good + neutral + bad) * 100} % <br />
    </p> 
  </div>)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App