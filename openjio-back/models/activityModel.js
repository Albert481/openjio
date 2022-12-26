const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
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
    location: {
        type: String
    },
    members: {
        type: Array,
        ref: 'User'
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Activity', activitySchema);