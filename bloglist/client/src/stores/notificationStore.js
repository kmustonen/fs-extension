import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

let timeout = null

const useNotificationStore = create(
  devtools((set) => ({
    notification: { message: null, status: null },
    actions: {
      setNotification: (message, status) => {
        clearTimeout(timeout)
        set({ notification: { message, status } })
        timeout = setTimeout(() => set({ notification: { message: null, status: null } }), 5000)
      }
    }
  }))
)

export const useNotification = () => useNotificationStore((state) => state.notification)
export const useSetNotification = () =>
  useNotificationStore((state) => state.actions.setNotification)

export const setNotification = (message, status) =>
  useNotificationStore.getState().actions.setNotification(message, status)
