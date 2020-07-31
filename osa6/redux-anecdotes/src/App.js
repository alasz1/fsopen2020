import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import store from './components/Store'

const App = () => {
  console.log("STATE: ", store.getState())
  return (
    <div>
    <Notification />
    <AnecdoteList />
    <AnecdoteForm />
    </div>
  )
}

export default App