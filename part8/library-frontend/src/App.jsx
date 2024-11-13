import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client";
import Recommendations from "./components/Recommendations";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token,setToken] = useState(null)
  const [genre,setGenre] = useState('')
  const client = useApolloClient()
  const [error,setError] = useState(null)

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("authors")
  }

  return (
    <div>
      <Error error={error}/>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        { token ? 
        <>
          <button onClick={() => setPage("add")}>add book</button>
          <button onClick={() => setPage("recommendations")}>recommend</button>
          <button onClick={logout}>Logout</button>
        </>
        :
        <>
          <button onClick={() => setPage("login")}>Login</button>
        </>
        }
      </div>

      <Authors show={page === "authors"} token={token} setError={setError}/>

      <Books show={page === "books"} genre={genre} setGenre={setGenre} />

      <NewBook show={page === "add"} setPage={setPage} selectedGenre={genre} setError={setError}/>

      <LoginForm show={page === "login"} setToken={setToken} setPage={setPage} setError={setError}/>

      <Recommendations show={page === "recommendations"}/>

    </div>
  );
};

const Error = ({error}) => {
  return(
    <div>
     <p style={{ color: 'red' }}>{error}</p>
    </div>
  )
}

export default App;
