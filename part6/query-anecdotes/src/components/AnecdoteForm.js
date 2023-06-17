import { createAnecdotes } from "../requests"
import { useMutation, useQueryClient } from "react-query"
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const [notification, dispatch] = useContext(NotificationContext)
  const newAnecdoteMutation = useMutation(createAnecdotes, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const getId = () => (100000 * Math.random()).toFixed(0)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const id = getId()
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0, id: id })
    dispatch({ type: 'setNotification', payload: `anecdote '${content}' added` })
    setTimeout(() => dispatch({ type: 'clearNotification' }), 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
