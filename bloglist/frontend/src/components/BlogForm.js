import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      author: author,
      title: title,
      url: url,
    })

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div className="formDiv">
      <h2> Create a new blog</h2>

      <form onSubmit={addBlog} >
        <div>
          <h3>add new blog</h3>
                    author
          <input type="text" value={author} id="author" onChange={({ target }) => setAuthor(target.value)} placeholder='write blog author here'/>
        </div>
        <div>
                    title
          <input type="text" value={title} id="title" onChange={({ target }) => setTitle(target.value)} placeholder='write blog title here'/>
        </div>
        <div>
                    url
          <input type="text" value={url} id="url" onChange={({ target }) => setUrl(target.value)} placeholder='write blog url here' />
        </div>

        <button id='blog-button' type="submit">save</button>
      </form>
    </div>
  )


}

export default BlogForm