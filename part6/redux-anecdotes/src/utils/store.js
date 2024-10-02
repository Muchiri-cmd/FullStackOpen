import { configureStore } from '@reduxjs/toolkit'
import { anecdoteReducer,filterReducer } from '../reducers'

export const store = configureStore({
  reducer:{
    anecdotes:anecdoteReducer,
    filter:filterReducer
  }
})
