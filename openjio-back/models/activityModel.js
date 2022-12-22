const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name value']
    },
    type: {
        type: String,
        required: [true, 'Please add a type value']
    },
    slot: {
        type: Number,
        required: [true, 'Please add a slot value']
    },
    datetime: {
        type: String,
        required: [true, 'Please add a datetime(unix) value']
    },
    members: {
        type: String
    },
    enabled: {
        type: Boolean
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Activity', activitySchema);