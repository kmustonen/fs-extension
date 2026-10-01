import { Typography } from '@mui/material'
import { useUsers } from '../stores/userStore'
import { useBlogs } from '../stores/blogStore'
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useUsers()
  const blogs = useBlogs()

  return (
    <div>
      <Typography variant="h4">users</Typography>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>username</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.username}</td>
              <td>{blogs.filter((b) => b.user.id === user.id).length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
