import { createStore, combineReducers } from 'redux'
import anecdoteReducer from '../reducers/anecdoteReducer'
import notificationReducer from '../reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import filterReducer from '../reducers/filterReducer'


// import { useDispatch } from 'react-redux'

// const dispatch = useDispatch()

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filter: filterReducer
})

const store = createStore(
    reducer,
    composeWithDevTools()
)



export default store;