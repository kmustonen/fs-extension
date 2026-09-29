import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => setValue('')

  return {
    get: {
      type,
      value,
      onChange
    },
    reset
  }
}

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(data => setAnecdotes(data))
  }, [])

  const addAnecdote = async (anecdote) => {
    await anecdoteService.createNew(anecdote)
    const data = await anecdoteService.getAll()
    setAnecdotes(data)
  }

  const deleteAnecdote = async (id) => {
    try {
      await anecdoteService.remove(id)
      setAnecdotes(anecdotes.filter((a) => a.id != id))
    } catch (error) {
      console.error(error)
    }
  }

  return { anecdotes, addAnecdote, deleteAnecdote }
}
