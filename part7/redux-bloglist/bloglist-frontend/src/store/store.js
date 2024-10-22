import { createStore,combineReducers,applyMiddleware } from 'redux'
import {thunk} from "redux-thunk";
import notificationReducer from '../reducers/notificationReducer'

const appReducer = combineReducers({
  notifications:notificationReducer,
})

const store = createStore(appReducer,applyMiddleware(thunk))

export default store