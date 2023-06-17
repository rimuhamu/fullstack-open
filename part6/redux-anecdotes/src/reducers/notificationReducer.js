import { createSlice } from "@reduxjs/toolkit"

const initialState = ''
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return null
        }
    }
})


export const { setNotification, removeNotification } = notificationSlice.actions

let timeout = null;

export const createNotification = (message, delay) => {
    return async dispatch => {
        dispatch(setNotification(message))

        if (timeout) {
            clearTimeout(timeout)
        }

        timeout = setTimeout(() => dispatch(removeNotification()), delay * 1000)
    }
}

export default notificationSlice.reducer