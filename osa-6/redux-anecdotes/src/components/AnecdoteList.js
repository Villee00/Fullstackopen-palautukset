import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdotes, initializeAnecdotes } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdote.filter(n => n.content.toLowerCase().includes(state.filter)))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdotes(id))
    dispatch(setNotification(`Voted anecdote`))
    setTimeout(() =>{
      dispatch(setNotification(""))
    }, 1000)
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