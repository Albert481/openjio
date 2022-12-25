const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

// @desc    Verify a user tokenId
// @route   POST /api/user/login
// @access  Public
const verifyGoogleToken = asyncHandler(async (req, res) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        let payload = ticket.getPayload();

        const { given_name, email, sub, picture } = payload

        // Check if user exists
        var user = await User.findOne({"google_sub": sub})
        if (!user) {
            // Create user
            user = await User.create({
                username: given_name,
                email: email,
                google_sub: sub,
                picture: picture
            })
        }

        // Return data for localStorage (user)
        res.json({
            _id: user._id,
            username: given_name,
            picture: picture,
            token: req.body.idToken
        })

    } catch (error) {
        throw new Error('Google Claims not valid')
    }

})

module.exports = {
    verifyGoogleToken
}