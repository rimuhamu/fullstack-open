import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'


describe('Blog component test', () => {
  test('renders blog title and author but not likes and url', () => {
    const blog = {
      title: 'Component testing for bloglist',
      author: 'Bob',
      likes: '12',
      url: 'www.asu.as'
    }

    const { container } = render(<Blog blog={blog} />)

    const blogTitle = container.querySelector('.blogtitle')
    expect(blogTitle).toHaveTextContent('Component testing for bloglist','Bob')

    const blogDetails = container.querySelector('.blogdetails')
    expect(blogDetails).toBeNull()
  })

  test('clicking the button shows blog details', async () => {
    const blog = {
      title: 'Component testing for bloglist',
      author: 'Bob',
      likes: '12',
      url: 'www.asu.as',
      user: '12345678910',
    }

    const mockHandler = jest.fn()

    render(
      <Blog blog={blog} showDetails={mockHandler} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const { container } = render(<Blog blog={blog} />)

    const blogDetails = container.querySelector('.blogdetails')
    waitFor(() => expect(blogDetails).toHaveTextContent('www.asu.as','12'))
  })

  test('clicking the like button twice call the function twice', async () => {
    const blog = {
      title: 'Component testing for bloglist',
      author: 'Bob',
      likes: '12',
      url: 'www.asu.as',
      user: '12345678910',
    }

    const mockHandler = jest.fn()
    const likesHandler = jest.fn()

    render(
      <Blog blog={blog} showDetails={mockHandler} addLikes={likesHandler} />
    )

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likesHandler.mock.calls).toHaveLength(2)
  })


  test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const inputAuthor = screen.getByPlaceholderText('write blog author here')
    const inputTitle = screen.getByPlaceholderText('write blog title here')
    const inputUrl = screen.getByPlaceholderText('write blog url here')
    const sendButton = screen.getByText('save')

    await user.type(inputAuthor, 'bobby')
    await user.type(inputTitle, 'bob daily life')
    await user.type(inputUrl, 'bobbylife.com')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    waitFor(() => expect(createBlog.mock.calls[0][0].content).toHaveTextContent('bobby', 'bob daily life', 'bobbylife.com'))
  })
})
