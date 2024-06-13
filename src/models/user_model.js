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
        unique: true,
        validate: [validator.isEmail, "Invalid email"]
    },
    phone: {
        type: {
            CountryCode: {
                type: Number,
                required: [true, "Country code is required"],
                default: 91
            },
       number: {
                type: String,
                required: [true, "Phone number is required"],
                minlength: [10, "Phone number must be 10 digits long"],
                unique: true,
                maxlength: [10, "Phone number must be 10 digits long"]
            }
        },
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
        street: {
            type: String,
        },
    },
    password: {
        type: String,
        minLength: [6, "Password must be atleast 6 characters long"],
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

userSchema.pre(['updateOne', 'findOneAndUpdate', 'update'], function (next) {
    this.set({ updatedOn: new Date() });
    next();
});
module.exports = model('User', userSchema);
