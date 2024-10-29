const blogReducer = (state = [],action) => {
  switch(action.type){
    case 'NEW_BLOG':
      return [...state,action.payload]
    case 'SET_BLOGS':
      return action.payload;

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

export default blogReducer