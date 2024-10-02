import { AnecdoteForm , AnecdoteList , Search, Notification } from './components';

const App = () => {
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