import { useState } from "react"
const Blog = ({ blog, handleAddLike }) => {

  const [visible,setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hide = { display:visible ? 'none': ''}
  const show = { display:visible ? '' : 'none'}
  
  return(
    <>
        <div style={{ ...blogStyle, ...hide }}>
          {blog.title}, {blog.author}
          <button onClick={ () => setVisible(true)}>View</button>
        </div>  
        <div style={{ ...blogStyle, ...show }}>
          <p>{blog.title}
            <button onClick={ () => setVisible(false)}>hide</button>
          </p>
          <p>{blog.url}</p>
          <p>likes {blog.likes}
            <button onClick={handleAddLike}>like</button>
          </p>
          <p>{blog.author}</p>
        </div> 
    </>


  )
  
}

export default Blog