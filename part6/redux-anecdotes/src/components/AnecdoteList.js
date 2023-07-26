import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { notificationChange } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const arrayForSort = [...state.anecdotes]
    const sortedArray = arrayForSort.sort((a, b) => b.votes - a.votes)

    if (state.filter) {
      return sortedArray.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
    }

    return sortedArray
  })

  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))

    const anecdoteToVote = anecdotes.find((anecdote) => anecdote.id === id)
    dispatch(notificationChange(`Voted '${anecdoteToVote.content}'`))
    setTimeout(() => {
      dispatch(notificationChange(null))
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList