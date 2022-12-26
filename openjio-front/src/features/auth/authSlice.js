import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Google Login
export const googleSignIn = createAsyncThunk('auth/googlesignin', async (credentials, thunkAPI) => {
    try {
        return await authService.googleSignIn(credentials)
    } catch (error) {
        const message = (error.response & error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(googleSignIn.pending, (state) => {
                state.isLoading = true
            })
            .addCase(googleSignIn.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(googleSignIn.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer