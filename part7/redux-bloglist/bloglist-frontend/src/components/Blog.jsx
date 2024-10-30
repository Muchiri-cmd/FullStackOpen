import { useState } from "react";
import { Link } from 'react-router-dom'

const Blog = ({ blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };


  const id = blog.id
  return (
    <>
      <div style={blogStyle} className="blog">
        {blog.title}, {blog.author}
        <button>
          <Link
            to={`/blogs/${id}`}
          >
            View
          </Link>
        </button>
      </div>
      
        {/* <p>{blog.url}</p>
       
        <p>{blog.author}</p>
        {blog.user && blog.user.username && <br></br>}
        {currentUser &&
          blog.user &&
          currentUser.username === blog.user.username && (
            <>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
      </div> */} 
    </>
  );
};

export default Blog;
