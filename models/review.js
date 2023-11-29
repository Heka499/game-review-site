const mongoose = require('mongoose'),
    reviewSchema = mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        review: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 10,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: {
            type: String,
            required: true
        },
        game: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game'
        }
    }, {
        timestamps: true
    });

module.exports = mongoose.model('Review', reviewSchema);