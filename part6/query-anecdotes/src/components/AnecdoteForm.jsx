import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests/request"
import { useContext } from "react"
import NotificationContext, { Dispatch } from "../context/NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const notificationDispatch = Dispatch()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey:['anecdotes'] })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({ content,votes:0 })
    notificationDispatch({ 
      type:'SET_NOTIFICATION',
      payload:`You created ${content}`
    })
    setTimeout(()=> {
      notificationDispatch({ 
        type:'REMOVE_NOTIFICATION',
      })
    },5000)
    event.target.anecdote.value = ''
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
