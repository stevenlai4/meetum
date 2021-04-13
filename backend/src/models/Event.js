const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: String,
    date: Date,
    description: String,
    location: { type: String, default: '' },
    users: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            address: String,
            role: String,
            is_going: {
                type: Boolean,
                default: false,
            },
        },
    ],
    createdOn: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Event', EventSchema);
