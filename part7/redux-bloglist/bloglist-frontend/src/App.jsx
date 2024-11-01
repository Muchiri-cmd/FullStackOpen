import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Toggle from "./components/Toggle";
import { useDispatch,useSelector } from "react-redux";
import { setNotification } from "./actions/notificationActions";
import { setBlogs,createBlog, likeBlog, deleteBlog } from "./actions/blogActions";
import { setUser,logoutUser } from "./actions/userActions";
import { BrowserRouter as Router, Routes , Route , Link ,useNavigate} from 'react-router-dom'
import Users from "./components/Users";
import User from './components/User'
import BlogDetail from "./components/BlogDetail";
import Nav from "./components/Navigation";
import Home from './components/Home'

const App = () => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const blogFormRef = useRef();

  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()
  const navigate = useNavigate(); 
  

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  }, []);

  useEffect(() => {
    const authenticatedUser = window.localStorage.getItem("authenticatedUser");
    if (authenticatedUser) {
      const user = JSON.parse(authenticatedUser);
      dispatch(setUser(user))
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("authenticatedUser", JSON.stringify(user));
      //set token after login
      blogService.setToken(user.token);
      dispatch(setUser(user))
      setUsername("");
      setPassword("");
      dispatch(setNotification(`Successfully logged in as ${user.username}`))
    } catch (error) {
      dispatch(setNotification(null,"wrong username or password"))
      // setErrorMessage("wrong username or password");
    }
  };

  const handleLogout = (event) => {
    dispatch(logoutUser());
    window.localStorage.removeItem("authenticatedUser");
    window.localStorage.clear();
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.create({ title, author, url });
      //set blog user to one who created blog
      blog.user = user;
      blogFormRef.current.toggleVisibility();
      // setBlogs(blogs.concat(blog));
      dispatch(createBlog(blog));
      setTitle("");
      setAuthor("");
      setUrl("");
      dispatch(setNotification(`a new blog "${title}" by ${author} added`))
    } catch (error) {
      dispatch(setNotification(null,errorMessage))
    }
  };

  const handleAddLike = async (blog) => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      };
      const returnedBlog = await blogService.like(blog.id, updatedBlog);
      dispatch(likeBlog(returnedBlog))
      dispatch(setNotification(`Liked "${returnedBlog.title}" by ${returnedBlog.author}`))
    } catch (error) {
      console.error(error);
      dispatch(setNotification(null,"Error updating likes"))
  
    }
  };

  const handleDelete = async (id) => {
  
    const blog = blogs.find((blog) => blog.id === id);
    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}?`);

    if (confirm) {
      try {
        await blogService.remove(id);
        // setBlogs(blogs.filter((b) => b.id !== id));
        dispatch(deleteBlog(blog.id))
        dispatch(setNotification("Blog deleted successfully"))
        navigate('/'); 
        // setMessage("Blog deleted successfully");
      } catch (error) {
        console.error(error);
        dispatch(null,"Error deleting blog")
        // setErrorMessage("Error deleting blog");
      }
    } else return;
  };
  const blogForm = () => {
    return (
      <Toggle buttonLabel="Add blog" ref={blogFormRef}>
        <BlogForm
          title={title}
          author={author}
          url={url}
          handleCreate={handleCreate}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
        />
      </Toggle>
    );
  };
  const loginForm = (
    <form id="loginForm" onSubmit={handleLogin}>
      <div>
        Username:
        <input
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          data-testid="username"
          className="mb-2 mx-2"
        />
      </div>
      <div>
        Password:
        <input
          type="text"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          data-testid="password"
          className="mb-2 mx-2"
        />
      </div>
      <button className="btn btn-success ms-2 " type="submit">Login</button>
    </form>
  );

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  const user = useSelector((state) => state.user)

  return (
    <div className='container'>
      <Nav user={user} handleLogout={handleLogout}/>
      <Notification message={message} error={errorMessage} />
      
      {user === null && loginForm}
      {user !== null && (
        <>
            <Routes>
              <Route path="/users" element={<Users/>}></Route>
              <Route path ="/" element={<Home
                blogForm={blogForm}
                sortedBlogs = {sortedBlogs}
              />}
              ></Route>
              <Route path="/users/:id" element={<User />} />
              <Route path="/blogs/:id" element={
                <BlogDetail 
                  handleAddLike={handleAddLike}
                  handleDelete={handleDelete}
                  currentUser={user}
              />} />
            </Routes>
        </>
      )}
    </div>
   
   
  );
};

export default App;
