import { Container, AppBar, Toolbar, Button, Typography, Box } from '@mui/material'
import { useEffect } from 'react'
import { useBlogActions, useBlogs } from './stores/blogStore'
import { useUser, useUserActions } from './stores/userStore'

import { Routes, Route, Link, Navigate, useMatch, useNavigate } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import ErrorBoundary from './components/ErrorBoundary'

const App = () => {
  const navigate = useNavigate()

  const user = useUser()
  const { login, logout } = useUserActions()
  const { initialize, create, like, remove } = useBlogActions()
  const blogs = useBlogs()

  useEffect(() => {
    initialize()
  }, [initialize])

  const handleLogout = (event) => {
    event.preventDefault()
    logout()
  }

  const createBlog = async (blog) => {
    if (await create(blog, user)) navigate('/')
  }

  const handleLike = async (blog) => {
    await like(blog.id)
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      await remove(blog)
      navigate('/')
    }
  }

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h4">blog app</Typography>
          <div>
            <Button color="inherit" component={Link} to="/" sx={style}>
              home
            </Button>
            {user && (
              <Button color="inherit" component={Link} to="/create" sx={style}>
                new blog
              </Button>
            )}
            {!user ? (
              <Button color="inherit" component={Link} to="/login" sx={style}>
                login
              </Button>
            ) : (
              <Button color="inherit" onClick={handleLogout} sx={style}>
                logout
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <ErrorBoundary>
        <Notification />
        <Box sx={{ p: 2 }}>
          <Routes>
            <Route path="/" element={<BlogList blogs={blogs} user={user} />} />
            <Route
              path="/login"
              element={user ? <Navigate replace to="/" /> : <LoginForm handleLogin={login} />}
            />
            <Route
              path="/create"
              element={user ? <BlogForm createBlog={createBlog} /> : <Navigate replace to="/" />}
            />
            <Route
              path="/blogs/:id"
              element={
                <Blog blog={blog} user={user} handleLike={handleLike} handleRemove={handleRemove} />
              }
            />
            <Route path="/*" element={<h2>404 Page Not Found</h2>} />
          </Routes>
        </Box>
      </ErrorBoundary>
    </Container>
  )
}

export default App
