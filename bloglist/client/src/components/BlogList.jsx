import { Typography, List, ListItem } from '@mui/material'

import { Link } from 'react-router-dom'
import { useBlogs } from '../stores/blogStore'
import { useUser } from '../stores/userStore'

const BlogList = () => {
  const blogs = useBlogs()
  const user = useUser()

  return (
    <div>
      {user && <Typography gutterBottom>{user.username} logged in</Typography>}
      <Typography variant="h4">blogs</Typography>
      <List>
        {blogs.map((blog) => (
          <ListItem key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default BlogList
