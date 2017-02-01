'use strict';

const mongoose = require('mongoose');
const emailHelper = require('../helpers/email');
const constants = require('./../../config/constants');
const hashService = require('../services/hash');
const sanitizerPlugin = require('mongoose-sanitizer');
const userSchema = new mongoose.Schema(
    {
        first_name:  {
            type: String,
            trim: true,
            required: true,
        },
        last_name: {
            type: String,
            trim: true,
            default: null
        },
        username: {
            type: String,
            trim: true,
            required: true,
            minlength: 4,
            lowercase: true,
            unique: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        phone: {
            type: Number,
            trim: true,
            default: null
        },
        location: {
            type: String,
            trim: true,
            default: null
        },
        last_location: {
            type: String,
            trim: true,
            default: null
        },
        timezone: {
            type: String,
            trim: true,
            default: null
        },
        last_login: {
            type: Date,
            default: Date.now
        },
        token: {
            type: String,
            default: null
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        autoIndex: true
    }
);

const User = mongoose.model('User', userSchema);
userSchema.plugin(sanitizerPlugin);
userSchema.path('email').validate((email) => {
    return email && email.length > 0;
}, constants.responses.E_REQUIRED_EMAIL_VALIDATION);

userSchema.set('toJSON', { getters: true, virtuals: false, transform: (doc, ret, options) => {
    delete ret.password;
    delete ret.__v;
    return ret;
} });

userSchema.pre('validate', function(next) {
    if(!this.password)
        this.password = process.env.DEFAULT_PASSWORD;
    if(this.email && this.isNew) {
        console.log('pre validate', this.isNew);
    }

    next();
});

userSchema.pre('save', function(next) {
    if(this.isModified('password') || this.isNew) {
        this.password = hashService.generate(this.password);
    }
    if((this.isModified('email') || this.isNew)){
        if(!emailHelper.validate(this.email) || !emailHelper.checkExistence(this.email)){
            const err = new Error(constants.errors.E_INVALID_EMAIL_VALIDATION.message);
            return next(err);
        }
        else if(!emailHelper.isUnique(User, this.email)) {
            const err = new Error(constants.errors.E_UNIQUE_EMAIL_VALIDATION.message);
            return next(err);
        }
    }

    return next();
});

module.exports = User;
