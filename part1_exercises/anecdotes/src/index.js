import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Heading = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

  // event handler that generates a random number
  const handleClick = () => {
    setSelected(Math.floor((Math.random() * props.anecdotes.length)))
  }

  // event handler for votes
  const handleVote = () => {
    // make sure to copy and create a new array
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  console.log(Math.max(...votes))

  return (
    <div>
      <Heading text='Anecdote of the day' />
      <p>{props.anecdotes[selected]}</p>
      <Button onClick={handleVote} text='vote' />
      <Button onClick={handleClick} text='next anecdote' />
      <p>has {votes[selected]} votes</p>
      <Heading text='Anecdote with most votes' />
      <p>{props.anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      <p>has {votes[votes.indexOf(Math.max(...votes))]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)