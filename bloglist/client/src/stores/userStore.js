import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { setNotification } from './notificationStore'

import blogService from '../services/blogs'
import loginService from '../services/login'
import userService from '../services/users'

const storageKey = 'loggedBloglistappUser'

const getLoggedUser = () => {
  const loggedUserJSON = window.localStorage.getItem(storageKey)
  if (!loggedUserJSON) return null
  const user = JSON.parse(loggedUserJSON)
  blogService.setToken(user.token)
  return user
}

const useUserStore = create(
  devtools((set) => ({
    user: getLoggedUser(),
    users: [],
    actions: {
      login: async ({ username, password }) => {
        try {
          const user = await loginService.login({ username, password })
          window.localStorage.setItem(storageKey, JSON.stringify(user))
          blogService.setToken(user.token)
          set({ user })
          return true
        } catch {
          setNotification('wrong username or password', 'error')
          return false
        }
      },
      logout: () => {
        window.localStorage.removeItem(storageKey)
        set({ user: null })
      },
      initialize: async () => {
        const users = await userService.getAll()
        set({ users })
      }
    }
  }))
)

export const useUser = () => useUserStore((state) => state.user)
export const useUsers = () => useUserStore((state) => state.users)
export const useUserActions = () => useUserStore((state) => state.actions)
