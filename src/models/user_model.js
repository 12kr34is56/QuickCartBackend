const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Invalid email"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"]
    },
    address:{
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        pincode: {
            type: Number,
        },
        block: {
            type: String,
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = model('User', userSchema);
