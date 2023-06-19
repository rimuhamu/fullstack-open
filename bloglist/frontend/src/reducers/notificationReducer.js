import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return null
        }
    }
})

const { setNotification, clearNotification } = notificationSlice.actions

let timeoutId

export const createNotification = (message, delay) => {
    return async (dispatch) => {
        dispatch(setNotification(message));

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => dispatch(clearNotification()), delay * 1000);
    };
};

export default notificationSlice.reducer;