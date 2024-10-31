import { useState } from "react"
import blogService from '../services/blogs'
import { useDispatch } from "react-redux"
import { addComment } from "../actions/blogActions"

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
      if (onCommentAdded) {
        onCommentAdded(updatedBlog.comments);
      }
    } catch (error) {
      console.error(error)
    } 
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="text" 
            id="comment"
            name="comment"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write a comment ..."
            />
        </div>
        <button type='submit'>Comment</button>
      </form>
    </div>
  )
}


export default CommentForm
