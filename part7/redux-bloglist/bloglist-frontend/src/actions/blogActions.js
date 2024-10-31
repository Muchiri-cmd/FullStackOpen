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

export const addComment = ( id, comments ) => {
  return {
    type:'ADD_COMMENT',
    payload:{ id, comments }
  }
}