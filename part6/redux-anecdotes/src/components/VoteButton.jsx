import { addVote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const VoteButton = ({ anecdote }) => {
  const dispatch = useDispatch()

  const vote = (id) => dispatch(addVote(id))
  return (
    <div>
       <button onClick={() => vote(anecdote.id)}>vote</button>
    </div>
  )
}

export default VoteButton
