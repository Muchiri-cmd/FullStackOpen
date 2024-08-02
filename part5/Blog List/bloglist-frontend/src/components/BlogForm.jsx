import PropTypes from 'prop-types'

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
BlogForm.propTypes = {
  title:PropTypes.string.isRequired,
  author:PropTypes.string.isRequired,
  url:PropTypes.string.isRequired,
  handleCreate:PropTypes.func.isRequired,
  handleTitleChange:PropTypes.func.isRequired,
  handleAuthorChange:PropTypes.func.isRequired,
  handleUrlChange:PropTypes.func.isRequired
}
export default BlogForm