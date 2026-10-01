import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { setNotification } from './notificationStore'

import loginService from '../services/login'
import userService from '../services/users'
import { getUser, saveUser, removeUser } from '../services/persistentUser'

const useUserStore = create(
  devtools((set) => ({
    user: getUser(),
    users: [],
    actions: {
      login: async ({ username, password }) => {
        try {
          const user = await loginService.login({ username, password })
          saveUser(user)
          set({ user })
          return true
        } catch {
          setNotification('wrong username or password', 'error')
          return false
        }
      },
      logout: () => {
        removeUser()
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
