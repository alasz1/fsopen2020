import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = total === 0 ? "0" : (good * 1 + bad * -1) / total
  const positive = total === 0 ? "-" : good / total * 100 + "%"

  return (
    total === 0
      ?
      <>
        <p>No feedback given</p>
      </>
      :
      <>
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={total} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Positive" value={positive} />
          </tbody>
        </table>
      </>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td style={{ minWidth: "5rem" }}>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <Statistics good={store.getState().good} neutral={store.getState().ok} bad={store.getState().bad} />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
