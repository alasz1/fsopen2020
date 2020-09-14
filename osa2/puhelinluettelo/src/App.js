import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '12345' }
  ]) 
  const [ newName, setNewName ] = useState('name')
  const [ newNumber, setNewNumber ] = useState('number')

  const addName = (event) => {
    event.preventDefault()
    console.log("button clicked", event.target)
    const nameObject = {
      name: newName,
      number: newNumber
    }

    //Check if name or number already exists
    const foundName = persons.find(element => element.name === nameObject.name)
    console.log(foundName)
    const foundNumber = persons.find(element => element.number === nameObject.number)
    console.log(foundNumber) 

    if (!foundName && !foundNumber) {
      setPersons(persons.concat(nameObject))
    } else if (!foundNumber) {
      alert(`${newName} is already added to phonebook!`)
    } else {
      alert(`${newNumber} is already added to phonebook!`)
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map(person => 
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          )}
        </ul>
    </div>
  )

}

export default App