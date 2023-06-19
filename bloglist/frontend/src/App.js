import { useRef, useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import ErrorNotification from './components/ErrorNotification'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [update, setUpdate] = useState(null)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    const fetchBlog = async () => {
      const blogs = await blogService.getAll()
      const sortedBlogs = sortBlogs(blogs)
      setBlogs(sortedBlogs)
    }

    fetchBlog()

  }, [update])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortBlogs = (blogs) => {
    const sortedBlogs = blogs.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes))
    return sortedBlogs
  }

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
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
    const returnedBlog = await blogService.create(blogObject)
    console.log(returnedBlog)
    setBlogs(blogs.concat(returnedBlog))
    setMessage(`Added ${blogObject.title} by ${blogObject.author}`)
  }

  const addLikes = async id => {
    const blog = blogs.find(blog => blog.id === id)
    const changedBlog = { ...blog,user: blog.user.id, likes: blog.likes+1 }

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
      <ErrorNotification message={errorMessage} />
      {user === null && <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>}
      {user && <div className='bloglist'>
        <h2>blogs</h2>
        <p>logged in as {user.name}</p>
        <button id='logout-button' onClick={handleLogout}>logout</button>
        <Notification message={message} />
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>

        {blogs.map((blog) =>
          <Blog key={blog.id} blog={blog} user={user} addLikes={() => addLikes(blog.id)}
            deleteBlog={() => remove(blog.id, user.token)}
          />
        )}
      </div>}

    </div>
  )

}
export default App