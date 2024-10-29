import React, { createContext , useReducer, useContext } from 'react'

const initialState = {
  message:null,
  error:null
}

//Reducer
const notificationReducer = (state,action) => {
  switch(action.type){
  case 'SET_NOTIFICATION':
    return { ...state,message:action.payload.message,error:action.payload.error }
  case 'CLEAR_NOTIFICATION':
    return initialState
  default:
    return state
  }
}

//context
const NotificationContext = createContext()

//provider
export const NotificationProvider = ({ children }) => {
  const [state,dispatch] = useReducer(notificationReducer,initialState)

  const setNotification = ( message,error) => {
    dispatch({
      type:'SET_NOTIFICATION',
      payload:{ message,error }
    })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    },5000)
  }
  return (
    <NotificationContext.Provider value={{ state, setNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  return useContext(NotificationContext)
}