import { addVote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification,removeNotification } from '../reducers/notificationReducer';

const VoteButton = ({ anecdote }) => {
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
    dispatch(setNotification(`You voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    },5000)
  }

  return (
    <div>
       <button onClick={() => vote(anecdote.id)}>vote</button>
    </div>
  )
}

export default VoteButton
