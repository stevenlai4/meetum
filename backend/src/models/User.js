const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    cognito_id: String,
    username: String,
    address: String,
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        },
    ],
});

module.exports = mongoose.model('User', UserSchema);
