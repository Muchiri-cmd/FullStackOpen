import { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Toggle from './components/Toggle'

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

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
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
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('authenticatedUser',JSON.stringify(user))
      //set token after login
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(error){
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
  }

  const handleLogout = (event) => {
    setUser(null)
    window.localStorage.removeItem('authenticatedUser')
    window.localStorage.clear()
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try{
      const blog = await blogService.create({ title,author,url })
      //set blog user to one who created blog
      blog.user = user
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setMessage(null)
      },2000)
    }catch(error){
      setErrorMessage(errorMessage)
    }
  }

  const handleAddLike = async (blog) => {
    try{
      const updatedBlog = {
        ...blog,
        likes:blog.likes + 1,
        user:blog.user.id
      }
      const returnedBlog = await blogService.like(blog.id,updatedBlog)
      setBlogs(blogs.map(b => ( b.id !== blog.id ? b : returnedBlog )))
    }catch(error){
      console.error(error)
      setErrorMessage('Error updating likes')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  const handleDelete = async(id) => {
    const blog = blogs.find(blog => blog.id === id)
    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}?`)

    if (confirm){
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(b => b.id !== id))
        setMessage('Blog deleted successfully')
        setTimeout(() => {
          setMessage(null)
        },2500)
      }catch(error){
        console.error(error)
        setErrorMessage('Error deleting blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 2500)
      }
    }
    else return
  }
  const blogForm = () => {
    return (
      <Toggle buttonLabel="Add blog" ref={blogFormRef}>
        <BlogForm
          title={title}
          author={author}
          url={url}
          handleCreate={handleCreate}
          handleTitleChange = {({ target }) => setTitle(target.value) }
          handleAuthorChange = {({ target }) => setAuthor(target.value) }
          handleUrlChange = { ({ target }) => setUrl(target.value) }
        />
      </Toggle>
    )
  }
  const loginForm = (
    <form id="loginForm" onSubmit={handleLogin}>
      <div>Username:
        <input type="text" name="username" value={username}
          onChange={ ({ target }) => setUsername(target.value)} data-testid="username"/>
      </div>
      <div>Password:
        <input type="text" name="password" value={password}
          onChange={ ({ target }) => setPassword(target.value) } data-testid="password"/>
      </div>
      <button type='submit'>Login</button>
    </form>
  )


  const sortedBlogs = [...blogs].sort((a,b) => b.likes - a.likes)
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
          {blogForm()}
          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog}
              handleAddLike={() => handleAddLike(blog)}
              handleDelete={() => handleDelete(blog.id)}
              currentUser = {user}
            />
          )}
        </>
      }

    </div>
  )
}

export default App