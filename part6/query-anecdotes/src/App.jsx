import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { addVote, fetchAnecdotes } from './requests/request'

const App = () => {
  const queryClient = useQueryClient()

  const handleVote = (anecdote) => {
    console.log('vote')
    console.log(anecdote.votes);
    
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
  }

  const updateAnecdoteMutation = useMutation({
    mutationFn:addVote,
    onSuccess:() => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const {isPending,isError,data,error} = useQuery({
    queryKey:['anecdotes'],
    queryFn:fetchAnecdotes,
    retry:1
  })
  if (isPending) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error:{error.message} <p>Anecdote service is unavailable due to problems in server</p> </span>
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
