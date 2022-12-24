import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import activityService from './activityService'

const initialState = {
    activities: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new activity
export const createActivity = createAsyncThunk('activity/create', async(activityData, thunkAPI) => {
    try {
        console.log(activityData)
        const token = thunkAPI.getState().auth.user.token;
        return await activityService.createActivity(activityData, token);
    } catch (error) {
        const message = (error.response & error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

// Get active activities
export const getActiveActivities = createAsyncThunk('activity/getActive', async(_, thunkAPI) => {
    try {
        // const token = thunkAPI.getState().auth.user.token;
        return await activityService.getActiveActivities();
    } catch (error) {
        const message = (error.response & error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

// Delete activity
export const disableActivity = createAsyncThunk('activity/disable', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await activityService.disableActivity(id, token);
    } catch (error) {
        const message = (error.response & error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})


export const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createActivity.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createActivity.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.activities.push(action.payload)
            })
            .addCase(createActivity.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getActiveActivities.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getActiveActivities.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.activities = action.payload
            })
            .addCase(getActiveActivities.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(disableActivity.pending, (state) => {
                state.isLoading = true
            })
            .addCase(disableActivity.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.activities = state.activities.filter((activity) => activity._id !== action.payload._id)
            })
            .addCase(disableActivity.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = activitySlice.actions;
export default activitySlice.reducer;