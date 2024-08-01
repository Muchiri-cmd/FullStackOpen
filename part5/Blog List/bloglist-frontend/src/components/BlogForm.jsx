const BlogForm = ({ 
  title,
  author,
  url,
  handleCreate,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
 }) => {
  return(
    <>
      <form onSubmit={handleCreate}>
        <div>Title:
          <input type="text" name="title" value={title}
          onChange={handleTitleChange}/>
        </div>
        <div>Author: 
          <input type="text" name="author" value={author}
          onChange={handleAuthorChange}/>
        </div>
        <div>Url: 
          <input type="text" name="url" value={url}
          onChange={handleUrlChange}/>
        </div>
        <button onClick={handleCreate} type='submit'>Create</button>
      </form>
    </>

  )
}
export default BlogForm