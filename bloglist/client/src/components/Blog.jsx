import { useState } from 'react'
import { Typography, Button, Stack, Card } from '@mui/material'
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

  if (!blog) return <h2>404 Page Not Found</h2>

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
          <input
            type="text"
            value={newComment}
            onChange={({ target }) => setNewComment(target.value)}
          />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
      </Stack>
    </Card>
  )
}

export default Blog
