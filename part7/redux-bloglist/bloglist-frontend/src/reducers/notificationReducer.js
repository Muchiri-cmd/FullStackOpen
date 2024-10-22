const initialState = {
  message:null,
  error:null
}

const notificationReducer = (state=initialState, action) => {
  switch(action.type){
    case "SET_NOTIFICATION":
      return {
        ...state,
        message:action.payload.message,
        error:action.payload.error,
      }
    case "CLEAR_NOTIFICATION":
      return initialState
    default:
      return state
  }
}

export default notificationReducer