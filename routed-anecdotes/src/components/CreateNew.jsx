import { useNavigate } from "react-router-dom"
import { useField, useAnecdotes } from '../hooks'

const CreateNew = () => {
  const { addAnecdote } = useAnecdotes()

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addAnecdote({ content: content.get.value, author: author.get.value, info: info.get.value, votes: 0 })
    navigate("/")
  }

  const resetFields = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.get} />
        </div>
        <div>
          author
          <input {...author.get} />
        </div>
        <div>
          url for more info
          <input {...info.get} />
        </div>
        <button>create</button>
        <button type="button" onClick={resetFields}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
