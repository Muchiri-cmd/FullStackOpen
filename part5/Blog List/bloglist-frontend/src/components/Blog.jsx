import { useState } from 'react'
const Blog = ({ blog, handleAddLike, handleDelete, currentUser }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  return (
    <>
      <div style={{ ...blogStyle, ...hide }} className="blog">
        {blog.title}, {blog.author}
        <button onClick={() => setVisible(true)}>View</button>
      </div>
      <div style={{ ...blogStyle, ...show }} className="blogDetails">
        <p>{blog.title}
          <button onClick={() => setVisible(false)}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>likes <span className='likes-count'>{blog.likes}</span>
          <button onClick={handleAddLike}>like</button>
        </p>
        <p>{blog.author}</p>
        {blog.user && blog.user.username && <br></br>}
        {currentUser && (
          <>
            {currentUser.username === blog.user?.username && (
              <button onClick={handleDelete}>Delete</button>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Blog
