const asyncHandler = require('express-async-handler');

// @desc    Get activities
// @route   GET /api/activity
// @access  Private
const getActivity = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Get activity`})
})

// @desc    Set activity
// @route   POST /api/activity
// @access  Private
const setActivity = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add a text field");
    }
    res.status(200).json({message: `Set activity`})
})


// @desc    Update activity
// @route   PUT /api/activity:id
// @access  Private
const updateActivity = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update activity ${req.params.id}`})
})

// @desc    Delete activity
// @route   DELETE /api/activity/:id
// @access  Private
const deleteActivity = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete activity ${req.params.id}`})
})


module.exports = {
    getActivity,
    setActivity,
    updateActivity,
    deleteActivity
}