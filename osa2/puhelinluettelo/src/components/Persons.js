import React from 'react';
import PersonService from '../services/PersonService'

const Persons = (props) => {

    const listStyle = { display: 'inline' }

    return (
        <div>
            <ul>
                {props.persons.filter(a => a.name.toLowerCase().includes(props.filter.toLowerCase()))
                    .map(person =>
                        <div key={person.id}>
                            <li key={person.name} style={listStyle}>
                                {person.name} {person.number}
                            </li>
                            <div style={listStyle}>&nbsp;</div>
                            <button onClick={() => {
                                if (window.confirm(`Delete ${person.name}?`)) {
                                    PersonService
                                        .remove(person.id)
                                        .then(() => {
                                            props.setPersons(props.persons.filter(b => b.id !== person.id))
                                        })
                                }
                            }
                            }>Delete</button>
                        </div>
                    )}
            </ul>
        </div>
    );
};

export default Persons;