import { createContext, useContext, useReducer } from 'react'

const initialState = {
  user:null,
}

const userReducer = ( state,action ) => {
  switch(action.type){
  case 'LOGIN':
    return { user:action.payload }
  case 'LOGOUT':
    return { user:null }
  default:
    throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const UserContext = createContext()

// Provider
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}


export const useUser = () => useContext(UserContext)