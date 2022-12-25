const express = require('express');
const router = express.Router();

const {protect} = require('../middleware/authMiddleware');

const {
    getActivities,
    setActivity,
    updateActivity,
    joinActivity,
    deleteActivity,
    getActiveActivities
} = require('../controllers/activityController');


router.route('/').get(getActivities).post(protect, setActivity);
router.route('/active').get(getActiveActivities);
router.route('/:id').delete(protect, deleteActivity).put(protect, updateActivity);
router.route('/:id/join').put(protect, joinActivity);


module.exports = router;