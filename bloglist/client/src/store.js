import { create } from 'zustand'

let timeout

const useNotificationStore = create((set) => ({
  notification: {
    message: null,
    status: null
  },
  setNotification: (newMessage, newStatus) =>
    set(() => ({ notification: { message: newMessage, status: newStatus } }))
}))

export const useNotification = () => useNotificationStore((state) => state.notification)
export const useSetNotification = () => {
  const setNotification = useNotificationStore((state) => state.setNotification)

  return (message, status) => {
    clearTimeout(timeout)
    setNotification(message, status)
    timeout = setTimeout(() => {
      setNotification(null, null)
    }, 5000)
  }
}
