import { useEffect,useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import userService from "../services/users"
import CommentForm from "./commentForm"
import { Button } from 'react-bootstrap'

const BlogDetail = ({handleAddLike,currentUser,handleDelete}) => {
  const { id } = useParams()
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
  
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const fetchUser = async () => {
      if (blog && blog.user) { 
        try {
          const userData = await userService.getUserById(blog.user.id)
          setUser(userData);
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
    };

    fetchUser();
  }, [blog]);

  if (!blog) {
    return <div>Loading...</div>
  }

  return (
    <div className='container'>
        <h2 className='mb-2'>
          {blog.title}
        </h2>
        <a href={blog.url} className='text-primary' target="_blank" rel="noopener noreferrer">{blog.url}</a>
        <div className="mt-1">
          <p className="d-flex align-items-center">
            likes <span className="likes-count mx-1">{blog.likes}</span>
            <Button onClick={() => handleAddLike(blog)}>like</Button>
          </p>
        </div>
        
       
        {blog.user && blog.user.username &&  <p className="text-muted">Added by {blog.user.username}</p> }
        {currentUser &&
          blog.user &&
          currentUser.username === blog.user.username && (
            <>
              <Button onClick={() => handleDelete(blog.id)} className="btn-danger">Delete</Button>
            </>
          )}
       
      
        <div className="mt-4">
          <CommentForm blogID={blog.id}/>
          <h4>Comments</h4>
          <ul className="mt-3">
            {blog.comments.slice().reverse().map((comment,index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
          

        </div>
    </div>
  )
}

export default BlogDetail
