import axios from 'axios'
const baseUrl = '/api/login'

const postLogin = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default postLogin