import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdotes, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes.filter(n => n.content.toLowerCase().includes(props.filter))

  const vote = (id) => {
    const anecdote = anecdotes.find(n => n.id === id)
    
    props.voteAnecdotes({...anecdote, votes: anecdote.votes +1})
    props.setNotification(`You voted '${anecdote.content}'`, 5)
  }

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

const mapDispatchToProps ={
  voteAnecdotes,
  setNotification,
  initializeAnecdotes,
}


const mapStateToProps = (state) =>{
  return{
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdote = connect(mapStateToProps,
  mapDispatchToProps)
  (AnecdoteList)
export default ConnectedAnecdote