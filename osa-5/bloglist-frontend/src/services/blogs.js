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
  return response
}

const update = async (blog) =>{
  const requestConfig = {
    headers: { Authorization: token },
  }
  const req = await axios.put(baseUrl + blog.id, blog,requestConfig)
  return req.data
}

const remove = async (id) =>{
  const requestConfig = {
    headers: { Authorization: token },
  }

  const req = await axios.delete(baseUrl + id,requestConfig)
  return req
}
export default {remove, getAll, create, setToken, update }
