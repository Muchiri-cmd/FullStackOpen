import { createSlice } from "@reduxjs/toolkit";

const notificationSlice= createSlice({
  name:'notification',
  initialState:'Initial Notification',
  reducers:{
    setNotificationMsg:(state,action) => action.payload,
    removeNotification:() => ''
  }
})

export const  { setNotificationMsg,removeNotification } = notificationSlice.actions

export const setNotification = (message,duration) => {
  return async dispatch => {
    dispatch(setNotificationMsg(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, duration * 1000 )
  }
}
export default notificationSlice.reducer