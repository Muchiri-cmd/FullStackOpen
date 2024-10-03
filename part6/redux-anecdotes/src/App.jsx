import { useDispatch } from 'react-redux';
import { AnecdoteForm , AnecdoteList , Search, Notification } from './components';
import { useEffect } from 'react';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  })

  return (
    <div>
      <h1>Anecdotes</h1>  
      <Notification/>
      <Search/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App