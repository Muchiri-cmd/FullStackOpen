import { useDispatch } from 'react-redux';
import { AnecdoteForm , AnecdoteList , Search, Notification } from './components';
import { useEffect } from 'react';
import anecdoteServices from './services/anecdotes'
import { setAnecotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteServices.fetch()
      .then(anecdotes => dispatch(setAnecotes(anecdotes)))
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