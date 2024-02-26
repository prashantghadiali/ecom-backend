const mongoose = require("mongoose");
const validator = require('validator');

// user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        // Use validator module to check if email is valid
        validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email address'
        }
    },
    password: {
        type: String,
        required: true,
    },
},{
    timestamps: true
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;