import React from 'react';
import Filter from './Filter'
import { useSelector, useDispatch } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import store from './Store'

const AnecdoteList = (props) => {

    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter.data)
    
    console.log("anecdotes: ", anecdotes, "filter: ", filter)

    const vote = (id, message, anecdote) => {
        console.log('vote id, msg, anecdote', id, message, anecdote)
        dispatch(newVote(id))
        dispatch(showNotification(message, anecdote))   // show notification for 5 seconds
        setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)
    }
    console.log("STATE: ", store.getState())
    console.log("filter ", filter)

    
    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter />

            {(filter.filter === "" ? anecdotes : anecdotes.filter(a => a.content.toLowerCase().includes(filter)))
            .map(anecdote =>
             
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes} vote{anecdote.votes === 1 ? "" : "s"}{' '}
                        <button onClick={() => vote(anecdote.id, "You voted for: ", anecdote.content)}>vote</button>
                    </div>

                </div>
            ) 
            }

        </div>
    );
};

export default AnecdoteList;