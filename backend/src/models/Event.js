const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: String,
    date: Date,
    description: String,
    location: { type: String, default: '' },
    users: [
        {
            cognito_id: String,
            address: String,
        },
    ],
    createdOn: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Event', EventSchema);
