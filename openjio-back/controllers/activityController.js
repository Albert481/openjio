const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const Activity = require('../models/activityModel');
const User = require('../models/userModel');

// @desc    Get activities
// @route   GET /api/activity
// @access  Private
const getActivities = asyncHandler(async (req, res) => {
    const activities = await Activity.find();

    res.status(200).json(activities)
})


// @desc    Get active activities
// @route   GET /api/activity
// @access  Private
const getActiveActivities = asyncHandler(async (req, res) => {
    const activities = await Activity.find({"active": true, "datetime": { $gt: new Date().getTime() / 1000 } }).populate("members").populate("user");

    res.status(200).json(activities)
})


// @desc    Set activity
// @route   POST /api/activity
// @access  Private
const setActivity = asyncHandler(async (req, res) => {
    let activity = await Activity.create({
        name: req.body.name,
        type: req.body.type,
        slot: req.body.slot,
        datetime: new Date(req.body.datetime).getTime() / 1000,
        location: req.body.location,
        contact: req.body.contact,
        user: req.body.user
    })
    activity = await activity.populate("user")

    res.status(200).json(activity)
})

// @desc    Join activity
// @route   PUT /api/activity/:id/join
// @access  Private
const joinActivity = asyncHandler(async (req, res) => {
    const activity = await Activity.findById(req.params.id)
    let members = activity.members;

    if (!activity) {
        res.status(400)
        throw new Error("Activity not found");
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    const index = members.findIndex((member) => member.toString() === req.user._id.toString());

    if (index === -1) {
        members.push(req.user._id.toString())
    } else {
        members = members.filter((member) => member.toString() != req.user._id.toString())
    }
    const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, {"members": members}, { new: true, }).populate("members").populate("user")
    res.status(200).json(updatedActivity)
})

// @desc    Update activity
// @route   PUT /api/activity/:id
// @access  Private
const updateActivity = asyncHandler(async (req, res) => {
    const activity = await Activity.findById(req.params.id)

    if (!activity) {
        res.status(400)
        throw new Error("Activity not found");
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    // Make sure the logged in user matches the activity user
    if (activity.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized");
    }

    const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true, })

    res.status(200).json(updatedActivity)
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
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    // Make sure the logged in user matches the activity user
    if (activity.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized");
    }

    await activity.remove()

    res.status(200).json({ id: req.params.id })
})


module.exports = {
    getActivities,
    getActiveActivities,
    setActivity,
    joinActivity,
    updateActivity,
    deleteActivity
}