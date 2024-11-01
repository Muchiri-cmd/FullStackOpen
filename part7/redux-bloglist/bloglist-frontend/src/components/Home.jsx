import Blog from '../components/Blog'

const Home = ( { blogForm,sortedBlogs }) => {
  return (
    <>
      <h3 className='my-2'>Create New</h3>
        {blogForm()}
        {sortedBlogs.length > 0 ? (
         sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            
          />
        ))
      ) : (
        <div>loading ...</div>
      )}
    </>
  )
}

export default Home
