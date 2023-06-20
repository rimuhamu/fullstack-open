import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'
import { createNotification } from "./notificationReducer";
import blogs from "../services/blogs";

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlog(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        updateBlog(state, action) {
            const updatedBlog = action.payload
            const { id } = updatedBlog
            return state.map((blog) => (blog.id !== id ? blog : updatedBlog))
        },
        removeBlog(state, action) {
            const id = action.payload
            return state.filter((blog) => blog.id !== id)
        }
    }
})

export const { setBlog, appendBlog, updateBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        console.log(blogs)
        dispatch(setBlog(blogs))
    }
}

export const createBlog = content => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch(appendBlog(newBlog))
        dispatch(createNotification({ message: `Added ${blogObject.title} by ${blogObject.author}`, type: 'success' }, 5))
    }
}

export const likeBlog = (id, blog) => {
    return async dispatch => {
        try {
            console.log(id)
            const likedBlog = await blogService.addLike(id, blog)
            console.log(likedBlog)
            dispatch(updateBlog(likedBlog))
            dispatch(createNotification({ message: `${blog.title} liked`, type: "info" }, 5))
        } catch (error) {
            dispatch(
                createNotification(
                    { message: error.response.data.error, type: "error" },
                    5
                )
            )
        }
    }
}

export const deleteBlog = (blog, user) => {
    return async (dispatch) => {
        try {
            await blogService.remove(blog.id, user.token)
            dispatch(removeBlog(blog.id))
            dispatch(
                createNotification(
                    { message: `${blog.title} by ${blog.author} removed!`, type: "info" },
                    5
                )
            )
        } catch (error) {
            dispatch(
                createNotification(
                    { message: error.response.data.error, type: "error" },
                    5
                )
            )
        }
    }
}

export default blogSlice.reducer