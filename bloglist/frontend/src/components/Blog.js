import { useState } from 'react'
const Blog = ({ blog, user, addLikes, deleteBlog }) => {
  const [display, setDisplay] = useState(false)
  const [sameUser, setSameUser] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const checkUser = (blog, user) => {
    if(blog.user.name === user.name){
      setSameUser(true)
    }
    else{
      setSameUser(false)
    }
  }

  return(
    <div style={blogStyle} className='blogtitle'>
      {blog.title} {blog.author}
      {display &&
    <div className='blog-details'>
      <a href={blog.url}>{blog.url}</a>
      <p>likes {blog.likes}
        <button id='like-button' onClick={addLikes}>like</button>
      </p>
      <p>{blog.user.name}</p>
      {sameUser &&
        <button id='delete-button' onClick={deleteBlog}>delete</button>
      }
    </div>}
      <button id='view-button' onClick={() => {setDisplay(!display); checkUser(blog, user)}}>view</button>
    </div>
  )
}

export default Blog