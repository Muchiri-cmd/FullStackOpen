import { useState, useEffect } from 'react'
import { useApolloClient, useMutation } from '@apollo/client'
import { LOGIN } from '../queries/queries'

const LoginForm = ({ show, setError, setToken,setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const client = useApolloClient()


  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })


  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
      client.resetStore() // Update Apollo Client headers after login
      setPage("authors") 
    }
  }, [result.data])

  if (!show){
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm