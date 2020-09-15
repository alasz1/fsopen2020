import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        console.log(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const filtered = countries.filter(a => a.name.toLowerCase().includes(filter.toLowerCase()))
  console.log(filtered)

  const flagStyle = { width: '400px' }

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
                  <li key={b.name}>
                    {b.name}
                  </li>
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
