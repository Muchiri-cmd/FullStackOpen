const blogReducer = (state = [],action) => {
  switch(action.type){
    case 'NEW_BLOG':
      return [...state,action.payload]
    case 'SET_BLOGS':
      return action.payload;
    case 'LIKE_BLOG':
     return state.map((blog) => blog.id !== action.payload.id ? blog : action.payload)
    case 'DELETE_BLOG':
      return state.filter((blog) => blog.id !== action.payload)
    default:
      return state
  }
}

export const setBlogs = (blogs) => {
  return {
    type:'SET_BLOGS',
    payload:blogs,
  }
}

export const createBlog = (blog) => {
  return {
    type:'NEW_BLOG',
    payload:blog,
  }
}

export const likeBlog = (blog) => {
  return {
    type:'LIKE_BLOG',
    payload:{
      ...blog,
      id:blog.id,
      likes: blog.likes,
    }
  }
}

export const deleteBlog = (id) => {
  return {
    type:'DELETE_BLOG',
    payload:id,
  }
}

export default blogReducer