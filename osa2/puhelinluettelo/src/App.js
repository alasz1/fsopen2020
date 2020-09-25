import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
// import axios from 'axios'
import PersonService from './services/PersonService'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('name')
  const [ newNumber, setNewNumber ] = useState('number')
  const [ filter, setFilter ] = useState('')

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
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>Add new</h2>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} filter={filter}/>
    </div>
  )
}

export default App