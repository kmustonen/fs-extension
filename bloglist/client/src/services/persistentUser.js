import blogService from './blogs'

const storageKey = 'loggedBloglistappUser'

export const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(storageKey)
  if (!loggedUserJSON) return null
  const user = JSON.parse(loggedUserJSON)
  blogService.setToken(user.token)
  return user
}

export const saveUser = (user) => {
  window.localStorage.setItem(storageKey, JSON.stringify(user))
  blogService.setToken(user.token)
}

export const removeUser = () => {
  window.localStorage.removeItem(storageKey)
}

export default { getUser, saveUser, removeUser }
