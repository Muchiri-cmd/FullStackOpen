import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const authorization = { headers:{ Authorization: token}}
  const response = await axios.post(baseUrl,newBlog,authorization)
  return response.data
}
const like = async (id,updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`,updatedBlog)
  return response.data
}

export default { getAll,create, setToken, like }