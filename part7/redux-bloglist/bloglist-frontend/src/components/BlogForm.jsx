import PropTypes from "prop-types";
import { Form,Button } from 'react-bootstrap'

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
      <Form onSubmit={handleCreate} className='p-3 border rounded'>
        <Form.Group controlId="title" className="mb-3">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="blog title"
            value={title}
            onChange={handleTitleChange}
          />
        </Form.Group>

        <Form.Group controlId="author" className="mb-3">
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type="text"
            name="author"
            placeholder="author name"
            value={author}
            onChange={handleAuthorChange}
          />
        </Form.Group>
       

        <Form.Group controlId="url" className="mb-3">
          <Form.Label>Url:</Form.Label>
          <Form.Control
            type="text"
            name="url"
            placeholder="blog url"
            value={url}
            onChange={handleUrlChange}
          />
        </Form.Group>

       
        <Button type="submit" className='my-1' variant='primary'>Create</Button>
      </Form>
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
