import React, { useState, useEffect } from 'react'
import axios from 'axios'

import AppHeader from './components/AppHeader'
import PersonRow from './components/PersonRow'

const App = () => {
  const [people, setPeople] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const getPeople = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:3001/people')
      setPeople(response.data)
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  const _handleSubmit = async (event) => {
    try {
      event.preventDefault()
      const response = await axios.post('http://localhost:3001/people', {name: event.target.name.value, birthdate: event.target.birthdate.value})
      if (response.status === 201) {
        setPeople([...people, response.data])
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  useEffect(() => { getPeople() }, [])

  if (loading) {
    return (
      <div>Loading…</div>
    )
  }

  return (
    <>
      <AppHeader peopleNumber={people.length} />
      {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
      {!errorMessage && <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Birthdate</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <PersonRow name={person.name} birthdate={person.birthdate} />
          ))}
        </tbody>
      </table>
    }
    <div className='new-person'>
      <h3>Add New Person</h3>
      <form onSubmit={_handleSubmit}>
        <input type='text' placeholder='Name (required)' name='name' />
        <input type='text' placeholder='Birthdate (optional)' name='birthdate' />
        <input type='submit' value='Add Person' />
      </form>
    </div>
    </>
  )
}

export default App
