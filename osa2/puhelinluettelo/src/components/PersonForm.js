import axios from 'axios';
import React from 'react';

const PersonForm = (props) => {

  const addName = (event) => {
    event.preventDefault()
    console.log("button clicked", event.target)
    const nameObject = {
      name: props.newName,
      number: props.newNumber
    }

    //Check if name or number already exists
    const foundName = props.persons.find(element => element.name === nameObject.name)
    console.log(foundName)
    const foundNumber = props.persons.find(element => element.number === nameObject.number)
    console.log(foundNumber)

    if (!foundName && !foundNumber) {
      // send new entry to server & update view with response
      axios
        .post('http://localhost:3001/persons', nameObject)
        .then(response => {
          props.setPersons(props.persons.concat(response.data))
        })
    } else if (!foundNumber) {
      alert(`${props.newName} is already added to phonebook!`)
    } else {
      alert(`${props.newNumber} is already added to phonebook!`)
    }

    props.setNewName('')
    props.setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    props.setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    props.setNewNumber(event.target.value)
  }

  return (
    <div>
      <form onSubmit={addName}>
        <div>
          name: <input value={props.newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;