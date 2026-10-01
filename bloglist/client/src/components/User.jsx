import { Typography, Stack, Card, List, ListItem } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useBlogs } from '../stores/blogStore'
import { useUsers } from '../stores/userStore'

const User = () => {
  const { id } = useParams()
  const user = useUsers().find((u) => u.id === id)
  const blogs = useBlogs()

  if (!user) return <Typography variant="h4">404 Page Not Found</Typography>

  return (
    <Card style={{ marginTop: 10, maxWidth: 600 }}>
      <Stack direction="column" style={{ padding: 10 }}>
        <Typography variant="h4">{user.name}</Typography>
        <Typography variant="h6">added blogs</Typography>
        <List>
          {blogs
            .filter((b) => b.user.id === user.id)
            .map((blog) => (
              <ListItem key={blog.id} disablePadding>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} by {blog.author}
                </Link>
              </ListItem>
            ))}
        </List>
      </Stack>
    </Card>
  )
}

export default User
