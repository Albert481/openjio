const express = require('express');
const router = express.Router();

const {protect} = require('../middleware/authMiddleware');

const {
    getActivities,
    setActivity,
    updateActivity,
    deleteActivity,
    getActiveActivities
} = require('../controllers/activityController');


router.route('/').get(getActivities).post(protect, setActivity);
router.route('/active').get(getActiveActivities);
router.route('/:id').delete(protect, deleteActivity).put(protect, updateActivity);


module.exports = router;