import axios from 'axios'

const baseUrl = '/api/blogs/'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (blog) => {
  const requestConfig = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blog, requestConfig)
  return response.data
}

const update = async (blog) => {
  const req = await axios.put(baseUrl + blog.id, blog)
  return req.data
}

const remove = async (id) => {
  const requestConfig = {
    headers: { Authorization: token },
  }

  const req = await axios.delete(baseUrl + id,requestConfig)
  return req
}

const sendComment = async (commentData) => {
  const requestConfig = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${commentData.id}/comments`, { comment: commentData.comment }, requestConfig)
  return response.data
}
export default { remove, getAll, create, setToken, update,sendComment }
