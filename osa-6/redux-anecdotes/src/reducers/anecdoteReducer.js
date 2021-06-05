const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.data.id
      const anecdote = state.find(n => n.id === id)
      const changedAnectode = { ...anecdote, votes: anecdote.votes + 1 }
      return state.map(ane =>
        ane.id !== id ? ane : changedAnectode).sort((a, b) => b.votes - a.votes)

    case "CREATE":
      return [...state, action.data]
    
    case "INIT_ANECDOTES":
      return action.data

    default:
      return state;
  }
}

export const voteAnecdotes = (id) => {
  return {
    type: "VOTE",
    data: {
      id
    }
  }
}

export const newAnecdote = (content) => {
  return {
    type: "CREATE",
    content,
  }
}

export const initializeAnecdotes = (anecdotes) =>{
  return{
    type: "INIT_ANECDOTES",
    data: anecdotes
  }
}

export default anecdoteReducer