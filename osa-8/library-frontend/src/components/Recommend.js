import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { ALL_BOOKS, CURRENT_USER } from '../queries'

const Recommend = (props) =>{
  const favoriteGenres = useQuery(CURRENT_USER)
  const [getBooks, {loading, data}] = useLazyQuery(ALL_BOOKS,{
    fetchPolicy: 'no-cache'
  })

  useEffect(() =>{
    if(!favoriteGenres.loading){
      getBooks({variables: {genre:favoriteGenres.data.me.favoriteGenre}})
    }
  }, [favoriteGenres.loading, props.show])

  if(!props.show){
    return null
  }

  if(favoriteGenres.loading || loading){
    return(<p>Loading...</p>)
  }
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
          {data.allBooks.map(a =>
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