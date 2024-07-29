import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)


  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async(event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username, password})
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(error){
      setErrorMessage('invalid login credentials.Please try again')
      setTimeout(()=>{
        setErrorMessage(null)
      },5000)
    }
    
  }

  const loginForm = (
    <form onSubmit={handleLogin}>
      <div>Username:
        <input type="text" name="username" value={username}
        onChange={ ({ target }) => setUsername(target.value) }/>
      </div>
      <div>Password: 
        <input type="text" name="password" value={password}
        onChange={ ({ target }) => setPassword(target.value) }/>
      </div>
      <button type='submit'>Login</button>
    </form>
  )
  return (
    <div>
      <h2>blogs</h2>
      {user===null && loginForm}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App