import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdotes, initializeAnecdotes } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdote.filter(n => n.content.toLowerCase().includes(state.filter)))
  const dispatch = useDispatch()

  const vote = (id) => {
    const anecdote = anecdotes.find(n => n.id === id)
    
    dispatch(voteAnecdotes({...anecdote, votes: anecdote.votes +1}))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
  }

  useEffect(() => {
    anecdoteService.getAll()
    .then(response =>{
      dispatch(initializeAnecdotes(response))
    })
  }, [dispatch])

  return (
    <div>
      {anecdotes.map(anecdote =>{
        return(
          <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
        )
      }
      )}
    </div>
  )
}

export default AnecdoteList