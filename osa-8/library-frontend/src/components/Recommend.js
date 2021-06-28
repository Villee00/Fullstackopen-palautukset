import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS, CURRENT_USER } from '../queries'

const Recommend = (props) =>{
  const favoriteGenres = useQuery(CURRENT_USER)
  const result = useQuery(ALL_BOOKS)
  
  if(!props.show){
    return null
  }

  if(favoriteGenres.loading || result.loading){
    return(<p>Loading...</p>)
  }
  
  const userGenre = favoriteGenres.data.me.favoriteGenre
  const books = result.data.allBooks.filter(n => n.genres.includes(userGenre))
  return(
    <div>
      <h1>Recommendations</h1>
      <p>Books that are match with your favorite genre</p>

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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend