import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {

    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state)
    console.log("anecdotes: ", anecdotes)
    
    const vote = (id) => {
        console.log('vote', id)
        dispatch(newVote(id))
      }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes} vote{anecdote.votes === 1 ? "" : "s"}{' '}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnecdoteList;