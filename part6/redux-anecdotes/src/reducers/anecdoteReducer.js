import { createSlice } from "@reduxjs/toolkit"
import { setNotification,removeNotification } from "./notificationReducer"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState:[],
  reducers:{
    addVote(state,action){   
      const id = action.payload
      const anecdoteToVote= state.find(anecdote => anecdote.id === id)

      const updatedAnecdote = {
        ...anecdoteToVote,
        votes:anecdoteToVote.votes + 1
      }

      setNotification(`You voted ${anecdoteToVote.content}`)
      setTimeout(() => {
        removeNotification()
      },5000)
      
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : updatedAnecdote
      ) 
    },
    appendAnecdote(state,action){
      state.push(action.payload)
    },
    setAnecotes(state,action){
      return action.payload
    }
  }
})

export const { addVote,appendAnecdote,setAnecotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.fetch()
    dispatch(setAnecotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer




