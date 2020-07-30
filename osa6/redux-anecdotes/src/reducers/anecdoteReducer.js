const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const newVote = (id) => {
  return {
    type: 'NEW_VOTE',
    id
  }
}

export const newAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_VOTE':
      const id = action.id
      console.log("id: ", id)
      const anecdoteToVote = state.find(n => n.id === id)  // search for the correct vote in array
      console.log("anecdotetovote: ", anecdoteToVote)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1   // add +1 vote for selected object
      }
      console.log("votedanecdote: ", votedAnecdote)
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote  // map the new array: where id is not the selected id: use old object data, otherwise: use updated data (=votedAnecdote)
      )
        .slice().sort(function (a, b) {   // slice returns copy of array (=no mutation of state) => then sort by votes
          const votesA = a.votes,
            votesB = b.votes
          if (votesA < votesB)
            return 1
          if (votesA > votesB)
            return -1
          return 0
        })
    case 'NEW_ANECDOTE':
      console.log(state)
      return [...state, action.data]
    default: return state
  }
}

export default reducer