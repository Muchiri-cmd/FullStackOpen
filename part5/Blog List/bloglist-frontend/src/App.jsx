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

  useEffect(()=> {
    const authenticatedUser = window.localStorage.getItem('authenticatedUser',JSON.stringify(user))
    if(authenticatedUser){
      const user = JSON.parse(authenticatedUser)
      setUser(user)
    }
  },[])

  const handleLogin = async(event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username, password})
      window.localStorage.setItem('authenticatedUser',JSON.stringify(user))
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

  const handleLogout = async(event)=>{
    setUser(null)
    window.localStorage.clear()
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
      {errorMessage}
      {user===null && loginForm}

      {user !== null && 
        <>
          {user.name} logged in
          <button  onClick={handleLogout}> Logout</button>

          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
      )}
        </>
      }
      
    </div>
  )
}

export default App