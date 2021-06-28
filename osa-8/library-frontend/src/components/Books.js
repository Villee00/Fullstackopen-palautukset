
import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import Select from 'react-select'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [selectedGenres, setSelectedGenres] = useState({
    value: "all", 
    label: "all"})

  if (!props.show) {
    return null
  }

  if(result.loading){
    return(<p>Loading...</p>)
  }
  const books = result.data.allBooks

  let genres = ["all"]
  books.map(book => genres.push(book.genres))
  const genreOptions = Array.from(new Set(genres.flat(1))).map(n => {
    return {
      value: n, 
      label: n.toLowerCase()}
  })
  
  const booksToShow = selectedGenres.value === "all"
  ?books
  :books.filter(book => book.genres.includes(selectedGenres.value))

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <Select
        options={genreOptions}
        onChange={setSelectedGenres}
        />
    </div>
  )
}

export default Books