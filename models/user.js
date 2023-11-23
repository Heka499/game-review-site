const mongoose = require('mongoose'),
    userSchema = mongoose.Schema({
        username: { 
            type: String,
            required: true,
            unique: true
        },
        email: { 
            type: String,
            required: true,
            unique: true,
            lovercase: true
        },
        password: {
            type: String,
            required: true
        },
        reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }]
    }, {
        timestamps: true
    });

userSchema.methods.getInfo = function () {
    return `Username: ${this.username} Email: ${this.email}`;
};

module.exports = mongoose.model('User', userSchema);