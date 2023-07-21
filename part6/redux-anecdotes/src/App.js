import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const generateId = () => Number((Math.random() * 1000000).toFixed(0))

  const addNew = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch({
      type: 'NEW',
      payload: {
        content,
        id: generateId(),
        votes: 0,
      },
    })
  }

  const vote = (id) => {
    console.log('vote', id)
    dispatch({ type: 'VOTE', payload: { id }})
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <input name='anecdote' />
        <button>create</button>
      </form>
    </div>
  )
}

export default App