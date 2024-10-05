import { createContext,useContext,useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type){
    case "SET_NOTIFICATION":
      return action.payload
    case "REMOVE_NOTIFICATION":
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer,"Initial notification")

  return (
    <NotificationContext.Provider value={[notification,notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const GetNotification = () => {
  const notificationandDispatch = useContext(NotificationContext)
  return notificationandDispatch[0]
}

export const Dispatch = () => {
  const notificationandDispatch = useContext(NotificationContext)
  return notificationandDispatch[1]
}

export default NotificationContext