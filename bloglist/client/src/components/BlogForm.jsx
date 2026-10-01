import { Typography, TextField, Button } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlogActions } from '../stores/blogStore'
import { useUser } from '../stores/userStore'

const BlogForm = () => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const { create } = useBlogActions()
  const user = useUser()
  const navigate = useNavigate()

  const addBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }

    if (await create(blog, user)) navigate('/')
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        create new
      </Typography>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label="title: "
            value={newBlogTitle}
            onChange={({ target }) => setNewBlogTitle(target.value)}
            style={{ marginTop: 10 }}
            variant="standard"
          />
        </div>
        <div>
          <TextField
            label="author: "
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)}
            style={{ marginTop: 10 }}
            variant="standard"
          />
        </div>
        <div>
          <TextField
            label="url: "
            value={newBlogUrl}
            onChange={({ target }) => setNewBlogUrl(target.value)}
            style={{ marginTop: 10 }}
            variant="standard"
          />
        </div>

        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          create
        </Button>
      </form>
    </div>
  )
}
export default BlogForm
