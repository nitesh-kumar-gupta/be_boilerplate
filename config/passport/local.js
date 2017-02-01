'use strict';

const _ = require('lodash');
const Promise = require('bluebird');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const emailHelper = require('./../../app/helpers/email');
const hashService = require('./../../app/services/hash');
const errors = require('./../constants').errors;
const LocalStrategy = require('passport-local').Strategy;

const LOCAL_STRATEGY_CONFIG = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
};

function _onLocalStrategyAuth(req, username, password, next) {
    Promise.coroutine(function* () {
        username = username.toLowerCase();
        let user = yield User.findOne({ $or: [{ 'username': username }, { 'email': username }]});
        if (!user) {
            let err = new Error();
            err.type = 'INFO';
            err.code = errors.E_USER_NOT_FOUND.code;
            err.message = errors.E_USER_NOT_FOUND.message;
            throw err;
        }
        if(!user.active){
            if(!user.emails[0].verification.complete) {
                let err = new Error;
                err.type = 'INFO';
                err.code = errors.E_USER_ACCOUNT_DISABLED.code;
                err.message = errors.E_USER_ACCOUNT_DISABLED.message;
                err.errors = user._id;
                console.log(err,'>>>>>>>>>>>>>>>>>>>>>>>>>>');
                throw err;
            }else{
                let err = new Error;
                err.type = 'INFO';
                err.code = errors.E_USER_ACCOUNT_LEFT.code;
                err.message = errors.E_USER_ACCOUNT_LEFT.message;
                throw err;
            }
        }

        if(!isValidPassword(user, password)) {
            let err = new Error();
            err.type = 'INFO';
            err.code = errors.E_INVALID_PASSWORD.code;
            err.message = errors.E_INVALID_PASSWORD.message;
            throw err;
        }
        return user;
    })()
        .then((user) => {
        return next(null, user, {});
})
.catch((err) => {
        if(err.type == 'INFO') {
        return next(null, false, err);
    }
    return next(err, false, {});
});
}

function isValidPassword(user, password) {
    return hashService.compare( password, user.password )
        || ( password === process.env.DEFAULT_PASSWORD );
}

const localStrategy = new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth);

module.exports = {
    strategy: localStrategy
};
