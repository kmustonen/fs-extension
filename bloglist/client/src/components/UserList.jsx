import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import { useUsers } from '../stores/userStore'
import { useBlogs } from '../stores/blogStore'
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useUsers()
  const blogs = useBlogs()

  return (
    <div>
      <Typography variant="h4">users</Typography>
      <TableContainer component={Paper} style={{ marginTop: 10, maxWidth: 600 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>username</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{blogs.filter((b) => b.user.id === user.id).length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList
