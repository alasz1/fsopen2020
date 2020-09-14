import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('a new name')

  const addName = (event) => {
    event.preventDefault()
    console.log("button clicked", event.target)
    const nameObject = {
      name: newName
    }

    //Check if name already exists
    const found = persons.find(element => element.name === nameObject.name)
    console.log(found)

    if (!found) {
      setPersons(persons.concat(nameObject))
    } else {
      alert(`${newName} is already added to phonebook!`)
    }

    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map(person => 
            <li key={person.name}>
              {person.name}
            </li>
          )}
        </ul>
    </div>
  )

}

export default App