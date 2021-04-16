const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: String,
    date: Date,
    description: String,
    locationPref: String,
    location_name: { type: String, default: '' },
    location_address: { type: String, default: '' },
    users: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            address: String,
            role: String,
        },
    ],
    createdOn: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Event', EventSchema);
