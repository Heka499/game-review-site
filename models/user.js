const passportLocalMongoose = require('passport-local-mongoose');
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

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

module.exports = mongoose.model('User', userSchema);