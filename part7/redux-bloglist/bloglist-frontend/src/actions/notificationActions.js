export const setNotification = ( message,error = null , timeout = 5000) => {
  return(dispatch) => {
    dispatch({
      type:"SET_NOTIFICATION",
      payload:{ message, error }
    })
    setTimeout(() => {
      dispatch(clearNotification())
    },timeout)
  }
}

export const clearNotification = () => {
  return {
    type:"CLEAR_NOTIFICATION"
  }
}