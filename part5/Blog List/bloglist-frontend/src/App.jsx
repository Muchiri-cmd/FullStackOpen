import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from "./components/notification";
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message,setMessage] = useState(null)

  const[title,setTitle] = useState('')
  const[author,setAuthor] = useState('')
  const[url,setUrl] = useState('')

  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  useEffect(()=> {
    const authenticatedUser = window.localStorage.getItem('authenticatedUser')
    if(authenticatedUser){
      const user = JSON.parse(authenticatedUser)
      setUser(user)
      blogService.setToken(user.token)
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
      setErrorMessage('wrong username or password')
      setTimeout(()=>{
        setErrorMessage(null)
      },5000)
    } 
  }

  const handleLogout = (event)=>{
    setUser(null)
    window.localStorage.removeItem('authenticatedUser')
    window.localStorage.clear()
  }

  const handleCreate = async (event) =>{
    event.preventDefault()
    try{
      const blog = await blogService.create({title,author,url})
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`a new blog ${title} by ${author} added`) 
      setTimeout(()=>{
        setMessage(null)
      },2000)
    }catch(error){
      setErrorMessage(errorMessage)
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

  const blogForm = (
    <form onSubmit={handleCreate}>
    <div>Title:
      <input type="text" name="title" value={title}
      onChange={ ({ target }) => setTitle(target.value) }/>
    </div>
    <div>Author: 
      <input type="text" name="author" value={author}
      onChange={ ({ target }) => setAuthor(target.value) }/>
    </div>
    <div>Url: 
      <input type="text" name="url" value={url}
      onChange={ ({ target }) => setUrl(target.value) }/>
    </div>
    <button onClick={handleCreate} type='submit'>Create</button>
  </form>
  )
  return (
    <div>
      <h1>blogs</h1>
      <Notification message={message} error={errorMessage}/>
      {user===null && loginForm}
      {user !== null && 
        <>
          {user.name} logged in
          <button  onClick={handleLogout}> Logout</button>

          <h3>Create New</h3>
          {blogForm}
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
      )}
        </>
      }
      
    </div>
  )
}

export default App