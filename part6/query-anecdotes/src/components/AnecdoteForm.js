import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries('anecdotes')
      dispatch(`Anecdote '${anecdote.content}' added`)
      setTimeout(() => {
        dispatch(null)
      }, 5000)
    },
    onError: (err) => {
      if (err.code === "ERR_BAD_REQUEST") {
        dispatch('Anecdote too short, must be atleast 5 characters')
        setTimeout(() => {
          dispatch(null)
        }, 5000)
      } else {
        dispatch(err.message)
        setTimeout(() => {
          dispatch(null)
        }, 5000)
      }
    }
  })

  const dispatch = useNotificationDispatch()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
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
