import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf, 0))
  const copy = [...votes]

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button 
        handleClick={() => {
          copy[selected] += 1
          setVotes(copy)
          console.log(copy)
        }}
        text="Vote"
      />
      <Button
        handleClick={() => {
          setSelected(Math.floor(Math.random() * props.anecdotes.length))
        }}
        text="Show random anecdote"
      />
      <h1>Anecdote with the most votes</h1>
      <p>{props.anecdotes[votes.indexOf(Math.max(...votes))]}</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => {

  return (
    <button onClick={handleClick}>
      {text}
    </button>
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