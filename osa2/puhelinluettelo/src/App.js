import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
// import axios from 'axios'
import PersonService from './services/PersonService'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('name')
  const [ newNumber, setNewNumber ] = useState('number')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    PersonService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>Add new</h2>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} setMessage={setMessage}/>
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} filter={filter} setMessage={setMessage}/>
    </div>
  )
}

export default App