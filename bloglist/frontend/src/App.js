import { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { orderBy } from "lodash"
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

import { createNotification } from './reducers/notificationReducer';
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer';
import { logUserIn, logUserOut, login } from './reducers/loginReducer';
import { initializeUsers } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch()


  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.login);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [update, setUpdate] = useState(null)

  const blogFormRef = useRef()

  const sortedBlogs = orderBy(blogs, ["likes"], ["desc"])

  useEffect(() => {
    const userFromStorage = userService.getUser();
    if (userFromStorage) {
      dispatch(login(userFromStorage));
    }
  }, [])

  useEffect(() => {

    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    console.log('fetching blogs and users')
    // might throw an error -> [update]
  }, [update])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(username)
    const credentials = {
      username: username,
      password: password
    }
    try {
      dispatch(logUserIn(credentials))
      console.log(user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(createNotification(
        {
          message: 'wrong credentials',
          type: "error",
        },
        5
      ))
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()

    console.log('logged out')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input id="username" type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input id="password" type='text' value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
  }

  const remove = (blog, user) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog, user))
      setUpdate(!update)
    }
  }


  return (
    <div>
      <h1>Blogs</h1>
      {user === null && <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>}
      <Notification />
      {user && <div className='bloglist'>
        <h2>blogs</h2>
        <p>logged in as {user.name}</p>
        <button id='logout-button' onClick={handleLogout}>logout</button>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>

        {sortedBlogs.map((blog) =>
          <Blog key={blog.id} blog={blog} user={user} addLikes={() => dispatch(likeBlog(blog.id, blog))}
            deleteBlog={() => remove(blog, user)}
          />
        )}
      </div>}

    </div>
  )

}
export default App