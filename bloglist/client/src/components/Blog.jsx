import { Typography, Button, Stack, Card } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useBlogActions } from '../stores/blogStore'
import { useUser } from '../stores/userStore'

const Blog = ({ blog }) => {
  const { like, remove } = useBlogActions()
  const user = useUser()
  const navigate = useNavigate()

  if (!blog) return <h2>404 Page Not Found</h2>

  const handleRemove = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      await remove(blog)
      navigate('/')
    }
  }

  return (
    <Card style={{ marginTop: 10, maxWidth: 600 }}>
      <Stack direction="column" style={{ padding: 10 }}>
        <Typography variant="h4">{blog.title}</Typography>
        <Typography variant="h6">by {blog.author}</Typography>
        <div>
          <a href={blog.url}>{blog.url}</a>
          <div>Added by {blog.user.name}</div>
          <Typography variant="h6">{blog.likes} likes</Typography>
          <Stack direction="row" spacing={2}>
            {user && (
              <Button variant="outlined" onClick={() => like(blog.id)}>
                like
              </Button>
            )}
            {user && blog.user.username === user.username && (
              <Button variant="outlined" color="error" onClick={handleRemove}>
                delete
              </Button>
            )}
          </Stack>
        </div>
      </Stack>
    </Card>
  )
}

export default Blog
