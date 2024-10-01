import { useSelector } from 'react-redux'
import VoteButton from './VoteButton'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === 'all'){
      return state.anecdotes
    }
    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  })
  const sortedAnecdotes = [...anecdotes].sort((a,b) => b.votes - a.votes )
  
  return (
    <>
      {sortedAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes} votes
          <VoteButton anecdote={anecdote}/>
        </div>
      </div>
    )}
    </>
  )
  
}

export default AnecdoteList