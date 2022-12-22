const express = require('express');
const router = express.Router();

const {
    getActivity,
    setActivity,
    updateActivity,
    deleteActivity
} = require('../controllers/activityController');


router.route('/').get(getActivity).post(setActivity);
router.route('/:id').delete(deleteActivity).put(updateActivity);


module.exports = router;