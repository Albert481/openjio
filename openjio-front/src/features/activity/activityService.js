import axios from 'axios'

const API_URL = process.env.REACT_APP_BACKEND_API + '/activity/'

// Create new activity
const createActivity = async (activityData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, activityData, config)

    return response.data
}

// Get all activities
const getActivities = async () => {
    const response = await axios.get(API_URL)

    return response.data
}

// Get all active activities
const getActiveActivities = async () => {
    const response = await axios.get(API_URL + 'active')

    return response.data
}

// Join activity
const joinActivity = async (activityId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + activityId + '/join', {}, config)

    return response.data
}

// Disable activity
const disableActivity = async (activityId, token) => {
    const content = {
        "active": false
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + activityId, content, config)

    return response.data
}

const activityService = {
    createActivity,
    getActivities,
    getActiveActivities,
    joinActivity,
    disableActivity
}

export default activityService;