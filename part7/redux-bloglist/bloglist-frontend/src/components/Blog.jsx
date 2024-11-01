import { Link } from 'react-router-dom'

const Blog = ({ blog}) => {
  const blogStyle = {
    padding:'10px',
    border: "1px solid grey",
    borderRadius:'5px',
    borderWidth: 1,
    marginBottom: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const buttonStyle={
    backgroundColor:"#007bff",
    border:'none',
    borderRadius:'5px',
    padding:'5px 10px',
  }

  const linkStyle = {
    color:'white',
    textDecoration:'none',
    fontWieght:'bold',
  }


  const id = blog.id
  return (
    <>
      <div style={blogStyle} className="blog">
        {blog.title}, {blog.author}
        <button style={buttonStyle}>
          <Link
            style={linkStyle}
            to={`/blogs/${id}`}
          >
            View
          </Link>
        </button>
      </div>
    </>
  );
};

export default Blog;
