const express = require('express');
const router = express.Router();

const {protect} = require('../middleware/authMiddleware');

const {
    getActivity,
    setActivity,
    updateActivity,
    deleteActivity
} = require('../controllers/activityController');


router.route('/').get(protect, getActivity).post(protect, setActivity);
router.route('/:id').delete(protect, deleteActivity).put(protect, updateActivity);


module.exports = router;