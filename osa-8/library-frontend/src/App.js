import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import Notification from './components/Notification'
import { ALL_BOOKS, BOOK_ADDED, CURRENT_USER } from './queries'

const App = () => {

  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [notficationMessage, setNotificationMessage] = useState(null)
  const result_books = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: [...dataInStore.allBooks, addedBook] }
      })
    }
    const dataInStoreUser = client.readQuery({ query: CURRENT_USER })
    const favoriteGenre = dataInStoreUser.me.favoriteGenre

    const dataInStoreFiltered = client.readQuery({ query: ALL_BOOKS,
    variables:{
      genre: favoriteGenre
    } })

    if(addedBook.genres.includes(favoriteGenre)){
      if (!includedIn(dataInStoreFiltered.allBooks, addedBook)) {
        client.writeQuery({
          query: ALL_BOOKS,
          variables:{
            genre: favoriteGenre
          },
          data: {allBooks: [...dataInStoreFiltered.allBooks, addedBook]}
        })
      }
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      setNotification(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.clearStore()
  }

  const setNotification = (message) => {
    setNotificationMessage(message)

    setTimeout(() => {
      setNotificationMessage(null)
    }, 4000)
  }

  useEffect(() => {
    const tokenStore = localStorage.getItem('library-token')
    if (tokenStore) {
      setToken(tokenStore)
    }
  }, [])

  if (result_books.loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {(token === null) ?
          null :
          <button onClick={() => setPage('add')}>add book</button>
        }

        {(token === null) ?
          null :
          <button onClick={() => setPage('recommend')}>recommend</button>
        }
        {(token === null) ?
          <button onClick={() => setPage('login')}>login</button> :
          <button onClick={() => logout()}>logout</button>
        }
        <Notification message={notficationMessage} />
      </div>
      <Authors
        show={page === 'authors'}
        setNotification={setNotification}
      />

      <Books
        show={page === 'books'}
        books={result_books.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        notification={setNotification}
        updateCacheWith={updateCacheWith}
      />

      <Recommend
        show={page === 'recommend'}
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