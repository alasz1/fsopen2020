import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import store from './components/Store'
import anecdoteService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  console.log("STATE: ", store.getState())

  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes =>
      dispatch(initializeAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App