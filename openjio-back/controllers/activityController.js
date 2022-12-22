const asyncHandler = require('express-async-handler');

const Activity = require('../models/activityModel');
const User = require('../models/userModel');

// @desc    Get activities
// @route   GET /api/activity
// @access  Private
const getActivity = asyncHandler(async (req, res) => {
    const activity = await Activity.find({ user: req.user.id })

    res.status(200).json(activity)
})

// @desc    Set activity
// @route   POST /api/activity
// @access  Private
const setActivity = asyncHandler(async (req, res) => {
    // if (!req.body.text) {
    //     res.status(400)
    //     throw new Error("Please add a text field");
    // }

    const activity = await Activity.create({
        name: req.body.name,
        type: req.body.type,
        slot: req.body.slot,
        datetime: req.body.datetime,
        user: req.user.id
    })

    res.status(200).json(activity)
})


// @desc    Update activity
// @route   PUT /api/activity:id
// @access  Private
const updateActivity = asyncHandler(async (req, res) => {
    const activity = await Activity.findById(req.params.id)

    if (!activity) {
        res.status(400)
        throw new Error("Activity not found");
    }

    const user = await User.findById(req.user.id);

    // Check for user
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    // Make sure the logged in user matches the activity user
    if (activity.user.toString() !== user.id) {
        res.status(401)
        throw new Error("User not authorized");
    }

    const updateActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true, })

    res.status(200).json(updateActivity)
})

// @desc    Delete activity
// @route   DELETE /api/activity/:id
// @access  Private
const deleteActivity = asyncHandler(async (req, res) => {
    const activity = await Activity.findById(req.params.id)

    if (!activity) {
        res.status(400)
        throw new Error("Activity not found");
    }

    // Check for user
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    // Make sure the logged in user matches the activity user
    if (activity.user.toString() !== user.id) {
        res.status(401)
        throw new Error("User not authorized");
    }

    const disabledActivity = await Activity.findByIdAndUpdate(req.params.id, { "enabled": false }, { new: true, })

    res.status(200).json(disabledActivity)
})


module.exports = {
    getActivity,
    setActivity,
    updateActivity,
    deleteActivity
}