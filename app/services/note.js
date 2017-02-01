'use strict';

const Promise = require('bluebird');
const mongoose = require('mongoose');
const Note = mongoose.model('Note');
const User = mongoose.model('User');
const errors = require('./../../config/constants/error');
module.exports = class Notes {
    constructor() {
    }
    static create(data) {
        return Promise.coroutine(function* () {
            let body = data.body;
            let authorization = data.headers.authorization;
            let user = yield User.findOne({'token':authorization});
            let note = new Note();
            note.user = user._id;
            note.content = body.note;
            return note.save();
        }).apply(this);
    }
    static list(data) {
        return Promise.coroutine(function* () {
            let user = yield User.findOne({'token':data});
            let note = yield Note.find({'user':user._id});
            return note;
        }).apply(this);
    }
    static show(data) {
        return Promise.coroutine(function* () {
            let id = data.params.id;
            let authorization = data.headers.authorization;
            let user = yield User.findOne({'token':authorization});
            let note = yield Note.findOne({'user':user._id,'_id':id,'active':true});
            if (!note) {
                let err = new Error();
                err.message = errors.E_NOTE_NOT_FOUND.message;
                err.code = errors.E_NOTE_NOT_FOUND.code;
                throw err;
            }
            return note;
        }).apply(this);
    }
    static update(data) {
        return Promise.coroutine(function* () {
            let id = data.params.id;
            let body = data.body;
            let authorization = data.headers.authorization;
            let user = yield User.findOne({'token':authorization});
            let note = yield Note.findOne({'user':user._id,'_id':id,'active':true});
            if (!note) {
                let err = new Error();
                err.message = errors.E_NOTE_NOT_FOUND.message;
                err.code = errors.E_NOTE_NOT_FOUND.code;
                throw err;
            }
            note.content = body.note;
            return note.save();
        }).apply(this);
    }
    static delete(data) {
        return Promise.coroutine(function* () {
            let id = data.params.id;
            let authorization = data.headers.authorization;
            let user = yield User.findOne({'token':authorization});
            let note = yield Note.findOne({'user':user._id,'_id':id,'active':true});
            if (!note) {
                let err = new Error();
                err.message = errors.E_NOTE_NOT_FOUND.message;
                err.code = errors.E_NOTE_NOT_FOUND.code;
                throw err;
            }
            note.active = false;
            note.save();
            return {
                deleted_note:id
            };
        }).apply(this);
    }
}


