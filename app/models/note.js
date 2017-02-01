'use strict';

const mongoose = require('mongoose');
const constants = require('./../../config/constants');
const User = require('./user');
const sanitizerPlugin = require('mongoose-sanitizer');

const noteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        content:  {
            type: String,
            required: true,
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
const Note = mongoose.model('Note', noteSchema);
noteSchema.plugin(sanitizerPlugin);
noteSchema.set('toJSON', {
    getters: true, virtuals: false, transform: (doc, ret, options) => {
        delete ret.user;
        delete ret.__v;
        return ret;
    }
});
module.exports = Note;
