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

  // everything regarding initialization happens now in anecdotereducer: fetching data from dbservice and sending it for the reducer
  // async function can be used in action creator (=initializeAnecdotes) as redux-thunk middleware is applied in store
  useEffect(() => { 
      dispatch(initializeAnecdotes())
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