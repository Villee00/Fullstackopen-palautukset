import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { likeAnecdotes, initializeAnecdotes } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(likeAnecdotes(id))
  }
  useEffect(() => {
    anecdoteService.getAll()
    .then(response =>{
      dispatch(initializeAnecdotes(response))
    })
  }, [])
  return (
    <div>
      {anecdotes.map(anecdote =>{
        console.log(anecdote)
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