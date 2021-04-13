const mongoose = require('mongoose');

const InvitationSchema = new mongoose.Schema({
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    },
    users: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            is_going: {
                type: Boolean,
                default: false,
            },
        },
    ],
});

module.exports = mongoose.model('Invitation', InvitationSchema);
