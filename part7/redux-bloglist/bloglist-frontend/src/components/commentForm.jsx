import { useState } from "react"
import blogService from '../services/blogs'
import { useDispatch } from "react-redux"
import { addComment } from "../actions/blogActions"
import { Form,Button } from 'react-bootstrap'
import { setNotification } from "../actions/notificationActions"

const CommentForm = ({ blogID,onCommentAdded }) => {
  const [comment,setComment] = useState('')

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }
  
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedBlog = await blogService.addComment(blogID, comment);
      setComment("");
      dispatch(addComment(blogID, updatedBlog.comments));
      dispatch(setNotification("Successfully added comment"))
      if (onCommentAdded) {
        onCommentAdded(updatedBlog.comments);
      }
    } catch (error) {
      console.error(error)
    } 
  };

  return (
    <div>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="comment" className="mb-3">
          <Form.Label>Comment:</Form.Label>
          <Form.Control 
            type="text" 
             name="comment"
             value={comment}
             onChange={handleCommentChange}
             placeholder="Write a comment ..."
          />
        </Form.Group>
    
        <Button type='submit' className="mt-2 mb-2">Comment</Button>
      </Form>
    </div>
  )
}


export default CommentForm
