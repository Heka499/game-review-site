const mongoose = require('mongoose'),
    gameSchema = mongoose.Schema({
        title: {
            type: String,
            required: true,
            unique: true
        },
        publisher: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        releaseDate: {
            type: Date,
            required: true
        },
        reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }]
    });

module.exports = mongoose.model('Game', gameSchema);