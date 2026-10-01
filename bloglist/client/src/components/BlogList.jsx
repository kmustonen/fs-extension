import { Typography } from '@mui/material'

import { Link } from 'react-router-dom'
import { useBlogs } from '../stores/blogStore'
import { useUser } from '../stores/userStore'

const BlogList = () => {
  const blogs = useBlogs()
  const user = useUser()

  return (
    <div>
      {user && <p>{user.username} logged in</p>}
      <Typography variant="h4">bloglist</Typography>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogList
