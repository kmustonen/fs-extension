import { Container, AppBar, Toolbar, Button, Typography, Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { useSetNotification } from './stores/notificationStore'
import { useBlogActions, useBlogs } from './stores/blogStore'

import blogService from './services/blogs'
import loginService from './services/login'

import { Routes, Route, Link, Navigate, useMatch, useNavigate } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import ErrorBoundary from './components/ErrorBoundary'

const App = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (!loggedUserJSON) return null
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    return user
  })
  const setNotification = useSetNotification()
  const { initialize, create, like, remove } = useBlogActions()
  const blogs = useBlogs()

  useEffect(() => {
    initialize()
  }, [initialize])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBloglistappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      return true
    } catch {
      setNotification('wrong username or password', 'error')
      return false
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistappUser')
    setUser(null)
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
              element={user ? <Navigate replace to="/" /> : <LoginForm handleLogin={handleLogin} />}
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
