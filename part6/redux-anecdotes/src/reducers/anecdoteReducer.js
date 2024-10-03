import { createSlice } from "@reduxjs/toolkit"
import { setNotification,removeNotification } from "./notificationReducer"



export const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }
// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState:[],
  reducers:{
    createAnecdote(state,action){
      state.push(action.payload)
    },
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

export const { createAnecdote, addVote,appendAnecdote,setAnecotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer




