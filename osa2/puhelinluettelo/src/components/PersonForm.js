// import axios from 'axios';
import React from 'react';
import PersonService from '../services/PersonService'

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
      PersonService
        .create(nameObject)
        .then(response => {
          if (!response.error) {
            console.log("create person response: ", response)
            props.setPersons(props.persons.concat(response))
            props.setMessage(`${nameObject.name} added to phonebook.`)
            setTimeout(() => {
              props.setMessage(null)
            }, 3000)
          } else {
            // Show validation error from server
            props.setErrMessage(`${response.error}'`)
            setTimeout(() => {
              props.setErrMessage(null)
            }, 5000)
          }
        })

    } else if (!foundNumber) {
      // alert(`${props.newName} is already added to phonebook!`)

      if (window.confirm(`${props.newName} is already added to phonebook. Replace the old number with a new one?`)) {
        PersonService
          .update(foundName.id, nameObject)
          .then((response) => {
            console.log("update person response: ", response)
            props.setPersons(props.persons.filter(b => b.id !== foundName.id).concat(response))
            props.setMessage(`${nameObject.name}'s number updated.`)
            setTimeout(() => {
              props.setMessage(null)
            }, 3000)
          })
          .catch(error => {
            props.setErrMessage(`${nameObject.name}'s information has already been removed from server.`)
            setTimeout(() => {
              props.setErrMessage(null)
            }, 3000)
          })
      }

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