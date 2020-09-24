import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GetWeather from './components/GetWeather'

const App = () => {

  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])
  const [filter, setFilter] = useState('')

  const api_key = process.env.REACT_APP_API_KEY

  const filtered = countries.filter(a => a.name.toLowerCase().includes(filter.toLowerCase()))
  console.log("filtered ", filtered.length)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        console.log("response.data: ", response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const flagStyle = { width: '300px' }
  const listStyle = { display: 'inline' }

  return (
    <div>
      <div>
        Find countries <input onChange={handleFilterChange} />
      </div>
      <div>
        <ul>
          {
            (countries.filter(a => a.name.toLowerCase().includes(filter.toLowerCase())).length <= 10 && countries.filter(a => a.name.toLowerCase().includes(filter.toLowerCase())).length > 1) ?
              (countries.filter(a => a.name.toLowerCase().includes(filter.toLowerCase()))
                // .slice(0, 10)
                .map(b =>
                  <div>
                    <li style={listStyle} key={b.name}>
                      {b.name} <div style={listStyle}>&nbsp;</div>
                    </li>
                    <button onClick={() => setFilter(b.name)}>Show</button>
                  </div>
                )
              )
              :
              (
                countries.filter(a => a.name.toLowerCase().includes(filter.toLowerCase())).length === 1
                  ?
                  (<div>
                    <h1>{countries.filter(a => a.name.toLowerCase().includes(filter.toLowerCase()))[0].name}</h1>
                    <p>capital: {countries.filter(a => a.name.toLowerCase().includes(filter.toLowerCase()))[0].capital}</p>
                    <p>population: {countries.filter(a => a.name.toLowerCase().includes(filter.toLowerCase()))[0].population}</p>
                    <h2>Languages</h2>
                    {(countries.filter(a => a.name.toLowerCase().includes(filter.toLowerCase()))[0].languages)
                      .map(l =>
                        <li key={l.name}>
                          {l.name}
                        </li>
                      )}
                    <br />
                    <img src={countries.filter(a => a.name.toLowerCase().includes(filter.toLowerCase()))[0].flag} alt="flag" style={flagStyle} />
                    <h2>Weather in {countries.filter(a => a.name.toLowerCase().includes(filter.toLowerCase()))[0].capital}</h2>
                    <GetWeather capital={countries.filter(a => a.name.toLowerCase().includes(filter.toLowerCase()))[0].capital} setWeather={setWeather} weather={weather} api_key={api_key}/>
                  </div>
                  )
                  :
                  (countries.filter(a => a.name.toLowerCase().includes(filter.toLowerCase())).length === 0) ?
                    (<p>No matches!</p>) :
                    (<p>Too Many matches!</p>)
              )
          }
        </ul>
      </div>
    </div>
  )
}

export default App
