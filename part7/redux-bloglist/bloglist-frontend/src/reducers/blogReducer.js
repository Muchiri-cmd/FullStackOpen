const blogReducer = (state = [],action) => {
  switch(action.type){
    case 'NEW_BLOG':
      return [...state,action.payload]
    case 'SET_BLOGS':
      return action.payload;
    case 'LIKE_BLOG':
      return state.map((blog) => {
        if (blog.id === action.payload.id) {
          return {
            ...blog,
            likes: action.payload.likes, 
          };
        }
        return blog; 
      });
    case 'DELETE_BLOG':
      return state.filter((blog) => blog.id !== action.payload)
    case 'ADD_COMMENT':
      return state.map((blog) => 
        blog.id === action.payload.id
      ? { ...blog, comments:action.payload.comments }
      : blog
      )
    default:
      return state
  }
}
export default blogReducer