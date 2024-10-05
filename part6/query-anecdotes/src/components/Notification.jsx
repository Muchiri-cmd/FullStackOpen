import { useContext, useReducer } from "react"
import { createContext } from "react"
import NotificationContext, { GetNotification } from "../context/NotificationContext"


const Notification = () => {
  const notification = GetNotification()  

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const hidden = {
    ...style,
    display:'None'
  }
  
  if (notification !== ''){    
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }

  return(
    <div style={hidden}>
        {notification}
    </div>
  )
 
}

export default Notification
