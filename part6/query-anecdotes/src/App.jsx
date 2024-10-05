import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { addVote, fetchAnecdotes } from './requests/request'
import NotificationContext, { Dispatch, NotificationContextProvider } from './context/NotificationContext'
import { useContext } from 'react'


const App = () => {
  const queryClient = useQueryClient()

  const notificationDispatch = Dispatch()
  
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({ 
      type:'SET_NOTIFICATION',
      payload:`You voted '${anecdote.content}'`
    })   
    setTimeout(()=> {
      notificationDispatch({ 
        type:'REMOVE_NOTIFICATION',
      })
    },5000)
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
    <>
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
    </>
  )
}

export default App
