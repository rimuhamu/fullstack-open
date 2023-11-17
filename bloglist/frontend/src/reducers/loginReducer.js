import { createSlice } from "@reduxjs/toolkit";
import { createNotification } from "./notificationReducer";
import loginService from "../services/login"
import userService from "../services/users"

const loginSlice = createSlice({
    name: "login",
    initialState: null,
    reducers: {
        login(state, action) {
            return action.payload
        },
        logout(state, action) {
            return action.payload
        }
    }
})

export const { login, logout } = loginSlice.actions

export const logUserIn = (credentials) => {
    return async dispatch => {
        const { username, password } = credentials

        try {
            const user = await loginService.login({ username, password })
            console.log("logged in")
            userService.setUser(user)
            console.log(user)
            dispatch(login(user))
            dispatch(
                createNotification({ message: `Welcome ${user.name}!`, type: "info" })
            )
        } catch (error) {
            dispatch(
                createNotification({ message: error.response.data.error, type: "error" })
            )
        }
    }
}

export const logUserOut = () => {
    return async (dispatch) => {
        userService.clearUser();
        dispatch(logout(null));
    };
};

export default loginSlice.reducer;