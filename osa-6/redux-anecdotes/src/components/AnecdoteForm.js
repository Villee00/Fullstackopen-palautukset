import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteNewForm =  () => {

  const dispatch = useDispatch()
  const createAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(newAnecdote(content))
    dispatch(setNotification(`Created new anecdote`, 5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteNewForm