import axios from 'axios'

const baseurl = 'http://localhost:3001/anecdotes/'

const getAll = async () =>{
    const response = await axios.get(baseurl)
    return response.data
}

const create = async (content) =>{
    const object = {content, votes: 0}
    const response = await axios.post(baseurl, object)
    return response.data
}

const vote = async (anecdote) =>{
    const response = await axios.put(baseurl + anecdote.id, anecdote)
    return response.data
}
export default {getAll, create, vote}
