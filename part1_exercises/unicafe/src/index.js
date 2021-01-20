import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad
  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <Statistic text='good' value={good} />
        <Statistic text='neutral' value={neutral} />
        <Statistic text='bad' value={bad} />
        <Statistic text='total' value={total} />
        <Statistic text='total' value={total} />
        <Statistic text='average' value={total / 3} />
        <Statistic text='positive' value={good / total} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (obj, method) => {
    method(obj + 1)
  }

  return (
    <div>
      <Display text='give feedback' />
      <Button onClick={() => handleClick(good, setGood)} text='good' />
      <Button onClick={() => handleClick(neutral, setNeutral)} text='neutral' />
      <Button onClick={() => handleClick(bad, setBad)} text='bad' />
      <Display text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )

}

ReactDOM.render(<App />,
  document.getElementById('root')
)