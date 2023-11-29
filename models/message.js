const mongoose = require('mongoose'),
    { Schema } = require('mongoose');

const messageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);