import React from 'react';
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {

    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        const message = "You added a new anecdote: "
        event.target.newAnecdote.value = ""
        // const newAnecdoteToDispatch = await anecdoteService.createNew(content)
        dispatch(newAnecdote(content))  // adding new anecdote can be processed by async action creator as redux-thunk is used 
        dispatch(showNotification(message, content))   // show notification for 5 seconds
        setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="newAnecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;