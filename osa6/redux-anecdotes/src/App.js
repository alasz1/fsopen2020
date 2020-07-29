import React from 'react'
import { useSelector, useDispatch } from 'react-redux'


const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const getId = () => (100000 * Math.random()).toFixed(0)

  const vote = (id) => {
    console.log('vote', id)
    dispatch({
      type: 'NEW_VOTE',
      id
    })
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ""
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content,
        id: getId(),
        votes: 0
      }
    })
      
  }

console.log("anecdotes: ", anecdotes)
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div> 
            has {anecdote.votes} vote{anecdote.votes === 1 ? "" : "s"}{' '}
      <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="newAnecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App