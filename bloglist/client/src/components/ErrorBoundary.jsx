import React from 'react'
import { Alert, Button, Typography } from '@mui/material'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <Typography variant="h4" gutterBottom>
            Something went wrong.
          </Typography>
          <Alert severity="error">{this.state.error.message}</Alert>
          <Button
            variant="contained"
            style={{ marginTop: 10 }}
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            try again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
