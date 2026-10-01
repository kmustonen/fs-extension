import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const url = `${baseUrl}/${blog.id}`
  await axios.put(url, blog, config)
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const url = `${baseUrl}/${blog.id}`
  await axios.delete(url, config)
}

const comment = async (blog, text) => {
  const url = `${baseUrl}/${blog.id}/comments`
  await axios.post(url, { comment: text })
}

export default { setToken, getAll, create, update, remove, comment }
