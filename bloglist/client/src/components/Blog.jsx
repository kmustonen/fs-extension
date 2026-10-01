import { useState } from 'react'
import {
  Typography,
  Button,
  Stack,
  Card,
  TextField,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useBlogActions, useBlogs } from '../stores/blogStore'
import { useUser } from '../stores/userStore'

const Blog = () => {
  const { id } = useParams()
  const blog = useBlogs().find((b) => b.id === id)
  const { like, remove, comment } = useBlogActions()
  const user = useUser()
  const navigate = useNavigate()
  const [newComment, setNewComment] = useState('')

  if (!blog) return <Typography variant="h4">404 Page Not Found</Typography>

  const handleComment = async (e) => {
    e.preventDefault()
    const text = newComment
    if (!text) return
    if (await comment(blog.id, text)) {
      setNewComment('')
    }
  }

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
        <Typography variant="h6">comments</Typography>
        <form onSubmit={handleComment}>
          <TextField
            label="comment"
            value={newComment}
            onChange={({ target }) => setNewComment(target.value)}
            variant="standard"
          />
          <Button type="submit" variant="contained" style={{ marginTop: 10, marginLeft: 10 }}>
            add comment
          </Button>
        </form>
        <List>
          {blog.comments.map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Card>
  )
}

export default Blog
