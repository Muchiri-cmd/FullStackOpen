import { configureStore } from '@reduxjs/toolkit'
import { anecdoteReducer,filterReducer,notificationReducer } from '../reducers'

export const store = configureStore({
  reducer:{
    anecdotes:anecdoteReducer,
    filter:filterReducer,
    notification:notificationReducer
  }
})
