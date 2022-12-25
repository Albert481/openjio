import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_API + '/user/'

// Google
// Sign In
const googleSignIn = async (credentials) => {
    // Verify credentials on backend
    const response = await axios.post(process.env.REACT_APP_BACKEND_API + '/auth/google', {
        idToken: credentials
    })
    
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    
    return response.data   
}

// Custom
// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)
    
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    googleSignIn,
    register,
    logout,
    login,
}

export default authService;