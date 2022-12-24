const express = require('express');
const router = express.Router();

const {protect} = require('../middleware/authMiddleware');

const {
    getActivities,
    setActivity,
    updateActivity,
    deleteActivity
} = require('../controllers/activityController');


router.route('/').get(getActivities).post(protect, setActivity);
router.route('/:id').delete(protect, deleteActivity).put(protect, updateActivity);


module.exports = router;