const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {        
            // Get token from header
            token = req.headers.authorization.split(' ')[1]
            const isCustomAuth = token.length < 500;

            // Verify custom token
            // if (isCustomAuth) {
                // const decoded = jwt.verify(token, process.env.JWT_SECRET)

                // Get user from the token
                // req.userId = await User.findById(decoded.id).select('-password');
            // } else {
                // Verify Google token
                const decoded = jwt.decode(token);
                req.userId = decoded?.sub;
            // }
            next()
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized');
        }
    }
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})


module.exports = {
    protect
}