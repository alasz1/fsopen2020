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
          props.setPersons(props.persons.concat(nameObject))
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