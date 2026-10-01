import { Alert } from '@mui/material'
import { useNotification } from '../stores/notificationStore'

const Notification = () => {
  const notification = useNotification()

  if (notification.message === null) {
    return null
  }

  return <Alert severity={notification.status}>{notification.message}</Alert>
}

export default Notification
