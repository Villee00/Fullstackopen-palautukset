import React from 'react'
import AnecdoteNewForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
        <AnecdoteList/>
        <AnecdoteNewForm/>
    </div>
  )
}

export default App