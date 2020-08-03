import React from 'react';
import Filter from './Filter'
import { useSelector, useDispatch } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import store from './Store'
import anecdoteService from '../services/anecdotes'

const AnecdoteList = (props) => {

    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter.data)
    
    console.log("anecdotes: ", anecdotes, "filter: ", filter)

    const vote = async (id, message, anecdote, votes) => {
        console.log('vote id, msg, anecdote, votes', id, message, anecdote, votes)

        dispatch(newVote(id)) // dispatch to reducer (doesn't go to db at the moment)

        // Below: updating votes in db. should basically work (still need to set votes +1 in service), but how to sync this with reducer..?

        // const content = {anecdote, id, votes}
        // console.log("content in anecdotelist: ", content)
        // const newVoteToDispatch = await anecdoteService.updateVotes(content)
        // dispatch(newVote(newVoteToDispatch))

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
                        <button onClick={() => vote(anecdote.id, "You voted for: ", anecdote.content, anecdote.votes)}>vote</button>
                    </div>

                </div>
            ) 
            }

        </div>
    );
};

export default AnecdoteList;