import axios from 'axios'
const baseurl = '/api/users'

const getAll = async () => {
  const usersReq = await axios.get(baseurl)
  return usersReq.data
}

export default getAll