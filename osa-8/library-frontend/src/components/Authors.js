import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_AUTHORS } from '../queries'
import BirthyearForm from './BirthyearForm'

const Authors = ({ show, setNotification }) => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return (
      <p>Loading...</p>
    )
  }

  if (!show) {
    return null
  }

  const authors = result.data.allAuthors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <BirthyearForm
        authors={authors}
        setNotification={setNotification} />
    </div>
  )
}

export default Authors