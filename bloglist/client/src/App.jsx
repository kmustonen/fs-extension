import { Container, AppBar, Toolbar, Button, Typography, Box } from '@mui/material'
import { useEffect } from 'react'
import { useBlogActions } from './stores/blogStore'
import { useUser, useUserActions } from './stores/userStore'

import { Routes, Route, Link, Navigate } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import User from './components/User'
import UserList from './components/UserList'
import Notification from './components/Notification'
import ErrorBoundary from './components/ErrorBoundary'

const App = () => {
  const user = useUser()
  const { login, logout, initialize: initializeUsers } = useUserActions()
  const { initialize: initializeBlogs } = useBlogActions()

  useEffect(() => {
    initializeBlogs()
    initializeUsers()
  }, [initializeBlogs, initializeUsers])

  const handleLogout = (event) => {
    event.preventDefault()
    logout()
  }

  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h4">blog app</Typography>
          <div>
            <Button color="inherit" component={Link} to="/" sx={style}>
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/users" sx={style}>
              users
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
            <Route path="/" element={<BlogList />} />
            <Route
              path="/login"
              element={user ? <Navigate replace to="/" /> : <LoginForm handleLogin={login} />}
            />
            <Route path="/create" element={user ? <BlogForm /> : <Navigate replace to="/" />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/*" element={<Typography variant="h4">404 Page Not Found</Typography>} />
          </Routes>
        </Box>
      </ErrorBoundary>
    </Container>
  )
}

export default App
