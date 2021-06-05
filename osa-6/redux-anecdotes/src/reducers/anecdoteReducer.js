import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      return state.map(ane =>
        ane.id !== action.data.id ? ane : action.data).sort((a, b) => b.votes - a.votes)

    case "CREATE":
      return [...state, action.data]
    
    case "INIT_ANECDOTES":
      return action.data.sort((a, b) => b.votes - a.votes)

    default:
      return state;
  }
}

export const voteAnecdotes = (anecdote) => {
  return async dispatch =>{
    const voteAnacdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: "VOTE",
      data: voteAnacdote
    })
  }
}

export const newAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(data)
    dispatch({
        type: "CREATE",
        data: newAnecdote,
      })
  } 
}

export const initializeAnecdotes = () =>{
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(
      {
        type: "INIT_ANECDOTES",
        data: anecdotes
      }
    )
  }
}

export default anecdoteReducer