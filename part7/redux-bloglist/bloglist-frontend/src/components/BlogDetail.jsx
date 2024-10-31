import { useEffect,useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import userService from "../services/users"
import CommentForm from "./commentForm"

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
    <div>
      <br />
        <h1>
          {blog.title}
        </h1>
        <a href={blog.url}>{blog.url}</a>
        <div>
          <br />
          <p>
            likes <span className="likes-count">{blog.likes}</span>
            <button onClick={() => handleAddLike(blog)}>like</button>
          </p>
        </div>
        
       
        {blog.user && blog.user.username &&  <p>Added by {blog.user.username}</p> }
        {currentUser &&
          blog.user &&
          currentUser.username === blog.user.username && (
            <>
              <button onClick={() => handleDelete(blog.id)}>Delete</button>
            </>
          )}
       
      
        <div>
          <br />
          <h4>Comments</h4>
          <CommentForm blogID={blog.id}/>
          <ul>
            {blog.comments.map((comment,index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
          

        </div>
    </div>
  )
}

export default BlogDetail
