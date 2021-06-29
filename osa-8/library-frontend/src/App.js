import { useApolloClient } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import Notification from './components/Notification'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [notficationMessage, setNotificationMessage] = useState(null)
  const client = useApolloClient()

  const logout = () =>{
    setToken(null)
    localStorage.clear()
    client.clearStore()
  }

  const setNotification = (message) =>{
    setNotificationMessage(message)

    setTimeout(()=>{
      setNotificationMessage(null)
    }, 4000)
  }

  useEffect(() =>{
    const tokenStore = localStorage.getItem('library-token')
    if(tokenStore){
      setToken(tokenStore)
    }
  }, [])
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {(token === null )?
        null:
          <button onClick={() => setPage('add')}>add book</button>
        }

        {(token === null )?
        null:
          <button onClick={() => setPage('recommend')}>recommend</button>
        }
        {(token === null )?
        <button onClick={() => setPage('login')}>login</button>:
        <button onClick={() => logout()}>logout</button>
      }
      <Notification message={notficationMessage}/>
      </div>
      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        notification={setNotification}
      />

      <Recommend
        show={page==='recommend'}
      />
      <LoginForm 
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
        notification={setNotification}
      />
    </div>
  )
}

export default App