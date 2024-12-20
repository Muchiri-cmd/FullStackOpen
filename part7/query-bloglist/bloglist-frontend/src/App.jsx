import { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Toggle from './components/Toggle'
import { useNotification } from './context/notificationContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useUser } from './context/userContext'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const { state: userState, dispatch } = useUser()
  const [errorMessage, setErrorMessage] = useState(null)
  const [message,setMessage] = useState(null)

  const[title,setTitle] = useState('')
  const[author,setAuthor] = useState('')
  const[url,setUrl] = useState('')

  const blogFormRef = useRef()

  const { state, setNotification } = useNotification()

  useEffect(() => {
    const authenticatedUser = window.localStorage.getItem('authenticatedUser')
    if(authenticatedUser){
      const user = JSON.parse(authenticatedUser)
      dispatch({ type: 'LOGIN', payload: user })
      blogService.setToken(user.token)
    }
  },[dispatch])

  const BlogList = () => {
    const queryClient = useQueryClient()

    const { data:blogs,error,isLoading } = useQuery({
      queryKey:['blogs'],
      queryFn:blogService.getAll,
      onError:() => {
        setNotification(null,'Error loading blogs!')
      }
    })

    const likeMutation = useMutation({
      mutationFn: (data) => blogService.like(data),
      onSuccess: (returnedBlog) => {
        queryClient.setQueryData(['blogs'], (prev) =>
          prev.map((blog) => (blog.id === returnedBlog.id ? returnedBlog : blog))
        )
        setNotification(`You liked "${returnedBlog.title}" by ${returnedBlog.author}`, null)
      },
      onError: () => {
        setNotification(null, 'Error updating like')
      },
    })

    const deleteMutation = useMutation({
      mutationFn:blogService.remove,
      onSuccess:() => {
        queryClient.invalidateQueries(['blogs'])
        setNotification('Blog deleted successfully',null)
      },
      onError:() => {
        setNotification(null,'Error deleting blog')
      }
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading blogs!</div>

    const sortedBlogs = [...blogs].sort((a,b) => b.likes - a.likes)

    const handleDelete = async(id) => {
      const blog = blogs.find(blog => blog.id === id)
      const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}?`)

      if (confirm){
        deleteMutation.mutate(id)
      }
    }

    const handleAddLike = async (blog) => {
      const updatedBlog = {
        ...blog,
        likes:blog.likes + 1,
        user:blog.user.id
      }
      likeMutation.mutate({ id:blog.id,updatedBlog })
    }


    return(
      <>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog}
            handleAddLike={() => handleAddLike(blog)}
            handleDelete={() => handleDelete(blog.id)}
            currentUser = {userState.user}
          />
        )}
      </>
    )
  }

  const handleLogin = async(event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('authenticatedUser',JSON.stringify(user))
      //set token after login
      blogService.setToken(user.token)
      dispatch({ type: 'LOGIN', payload: user })
      setUsername('')
      setPassword('')
    } catch(error){
      setNotification(null,'wrong username or password')
    }
  }

  const handleLogout = (event) => {
    dispatch({ type: 'LOGOUT' })
    window.localStorage.removeItem('authenticatedUser')
    window.localStorage.clear()
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try{
      const blog = await blogService.create({ title,author,url })
      //set blog user to one who created blog
      blog.user = userState.user
      blogFormRef.current.toggleVisibility()
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification(`a new blog ${title} by ${author} added`,null)
    }catch(error){
      setNotification(null,errorMessage)
    }
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

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={state.message} error={state.error}/>
      {userState.user===null && loginForm}
      {userState.user !== null &&
        <>
          {userState.user.name} logged in
          <button  onClick={handleLogout}> Logout</button>

          <h3>Create New</h3>
          {blogForm()}
          <BlogList/>
        </>
      }

    </div>
  )
}

export default App