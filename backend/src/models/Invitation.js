const mongoose = require('mongoose');

const InvitationSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    is_going: { type: Boolean, default: null },
});

module.exports = mongoose.model('Invitation', InvitationSchema);
