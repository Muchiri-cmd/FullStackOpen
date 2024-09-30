
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <h1>Anecdotes</h1>  
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App