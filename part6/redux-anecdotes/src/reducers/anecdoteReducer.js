import { createSlice } from "@reduxjs/toolkit"
import { setNotification } from "./notificationReducer"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState:[],
  reducers:{
    updateAnecdote(state, action) {
      return state.map(anecdote =>
        anecdote.id !== action.payload.id ? anecdote : action.payload
      )
    },
    appendAnecdote(state,action){
      state.push(action.payload)
    },
    setAnecotes(state,action){
      return action.payload
    },
  }
})

export const { appendAnecdote,setAnecotes,updateAnecdote } = anecdoteSlice.actions

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

export const addVote =  id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.addVote(id)
    dispatch(updateAnecdote(updatedAnecdote))
    dispatch(setNotification(`you voted '${updatedAnecdote.content}'`, 10))
  }
}

export default anecdoteSlice.reducer




