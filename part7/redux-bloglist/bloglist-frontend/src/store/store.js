import { createStore,combineReducers,applyMiddleware } from 'redux'
import {thunk} from "redux-thunk";
import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer';
import userReducer from '../reducers/userReducer';

const appReducer = combineReducers({
  notifications:notificationReducer,
  blogs:blogReducer,
  user:userReducer,
})

const store = createStore(appReducer,applyMiddleware(thunk))

export default store