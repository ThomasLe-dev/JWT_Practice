const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
    },

    admin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true}
)

module.exports = mongoose.model('User', userSchema);