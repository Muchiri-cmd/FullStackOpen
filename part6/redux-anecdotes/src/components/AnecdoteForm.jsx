import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer'; 
import { setNotification,removeNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(createAnecdote(content))
    dispatch(setNotification(`You created a new anecdote '${content}'`))

    setTimeout(() => {
      dispatch(removeNotification())
    },5000)
  }

  return (
    <>
    <h1>Create New</h1>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  
  )
}

export default AnecdoteForm;
