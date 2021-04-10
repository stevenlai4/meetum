const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: String,
    eventDate: Date,
    description: String,
    address: String,
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    eventCreatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Event', EventSchema);
