
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Search from './components/Search'

const App = () => {
  return (
    <div>
      <h1>Anecdotes</h1>  
      <Search/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App