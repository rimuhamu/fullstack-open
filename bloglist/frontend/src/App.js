import { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { orderBy } from "lodash"
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

import { createNotification } from './reducers/notificationReducer';
import { initializeBlogs, createBlog } from './reducers/blogReducer';

const App = () => {
  const dispatch = useDispatch()


  const blogs = useSelector((state) => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [update, setUpdate] = useState(null)

  const blogFormRef = useRef()

  const sortedBlogs = orderBy(blogs, ["likes"], ["desc"])

  useEffect(() => {
    dispatch(initializeBlogs())
    console.log('fetching blogs')
    // might throw an error -> [update]
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
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
    setUser(null)
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

  const addLikes = async id => {
    const blog = blogs.find(blog => blog.id === id)
    const changedBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 }

    const updatedBlog = await blogService.update(id, changedBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
  }

  const remove = async id => {
    const blog = blogs.find(blog => blog.id === id)
    if (window.confirm(`remove blog ${blog.title}) by ${blog.author}`)) {
      blogService.setToken(user.token)
      await blogService.remove(blog.id, user.token)
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
          <Blog key={blog.id} blog={blog} user={user} addLikes={() => addLikes(blog.id)}
            deleteBlog={() => remove(blog.id, user.token)}
          />
        )}
      </div>}

    </div>
  )

}
export default App