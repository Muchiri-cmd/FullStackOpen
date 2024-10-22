import PropTypes from "prop-types";

const BlogForm = ({
  title,
  author,
  url,
  handleCreate,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
}) => {
  return (
    <>
      <form onSubmit={handleCreate}>
        <div>
          Title:
          <input
            id="title"
            type="text"
            name="title"
            placeholder="blog title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author:
          <input
            id="author"
            type="text"
            name="author"
            placeholder="author name"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          Url:
          <input
            id="url"
            type="text"
            name="url"
            placeholder="blog url"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );
};
BlogForm.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleCreate: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
};
export default BlogForm;
