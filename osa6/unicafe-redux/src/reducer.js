const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      console.log({...state})
      return {...state, good: state.good + 1}  // ...state = what is to be incremented - after that the increment itself! I.e. replacing concat ( = state.concat(action.data) ) with array spread syntax. 
    case 'OK':
      console.log({...state})
      return {...state, ok: state.ok + 1} 
    case 'BAD':
      console.log({...state})
      return {...state, bad: state.bad + 1} 
    case 'ZERO':
      return initialState
    default: return state
  }

}

export default counterReducer