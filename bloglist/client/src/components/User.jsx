import { Typography, Stack, Card } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useBlogs } from '../stores/blogStore'
import { useUsers } from '../stores/userStore'

const User = () => {
  const { id } = useParams()
  const user = useUsers().find((u) => u.id === id)
  const blogs = useBlogs()

  if (!user) return <h2>404 Page Not Found</h2>

  return (
    <Card style={{ marginTop: 10, maxWidth: 600 }}>
      <Stack direction="column" style={{ padding: 10 }}>
        <Typography variant="h4">{user.name}</Typography>
        <Typography variant="h6">added blogs</Typography>
        <ul>
          {blogs
            .filter((b) => b.user.id === user.id)
            .map((blog) => (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} by {blog.author}
                </Link>
              </li>
            ))}
        </ul>
      </Stack>
    </Card>
  )
}

export default User
