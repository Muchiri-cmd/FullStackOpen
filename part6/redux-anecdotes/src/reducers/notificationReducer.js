import { createSlice } from "@reduxjs/toolkit";

const notificationSlice= createSlice({
  name:'notification',
  initialState:'Initial Notification',
  reducers:{
    setNotification:(state,action) => action.payload,
    removeNotification:() => ''
  }
})

export const  { setNotification,removeNotification } = notificationSlice.actions
export default notificationSlice.reducer