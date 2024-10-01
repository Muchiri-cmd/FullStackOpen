import ReactDOM from 'react-dom/client'
import { createStore,combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'

import filterReducer from './reducers/filterReducer'
import anecdoteReducer from './reducers/anecdoteReducer'

import { filterChange } from './reducers/filterReducer'
import { createAnecdote } from './reducers/anecdoteReducer'


const reducer = combineReducers({
  anecdotes:anecdoteReducer,
  filter:filterReducer
})

const store = createStore(reducer)
// store.subscribe(() => console.log(store.getState()))

store.dispatch(filterChange('all'))
store.dispatch(createAnecdote('combine reducers form one reducer from many simple reducers'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)