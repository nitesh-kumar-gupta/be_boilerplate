'use strict';

const _ = require('lodash');
const passport = require('passport');
const JwtService = require('./../../services/jwt-service');
const response = require('./../../../config/responses');

// load necessary models
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    login: (req, res) => {
        console.log(req);
        var user = req.body.email;
        passport.authenticate('local', { session: false }, (err, user, info) => {
            console.log('err',err);
            console.log('user',user);
            if (err)
                return response.error(res, err);
            if (!user)
                return response.unauthorized(res, info);
            let token = JwtService.createToken(user);
            user.token = 'JWT ' + token;
            user.save();
            return response.ok(res, user);
        })(req, res);
    },

    signup: (req, res) => {
        let user = new User(_.omit(req.body, ['id', '_id']));
        user.save()
            .then(() => {
                let token = JwtService.createToken(user);
                user.token = 'JWT ' + token;
                user.save();
                return response.created(res, user);
            })
            .catch((err) => {
                return response.error(res, err);
            });
    }
};
