import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'
import { createNotification } from "./notificationReducer";

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlog(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        }
    }
})

export const { setBlog, appendBlog } = blogSlice.actions

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

export default blogSlice.reducer