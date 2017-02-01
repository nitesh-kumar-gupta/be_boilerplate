'use strict';

const express = require('express');
const router = express.Router();
const authorization = require('./../middlewares/authorization');
const main = require('../../app/controllers/v1/base');
const user = require('../../app/controllers/v1/user');
const auth = require('../../app/controllers/v1/auth');
const note = require('../../app/controllers/v1/note');

// define routes
module.exports = function(passport) {
    // Add api version to the response
    router.use(function(req, res, next) {
        res._json = res.json;
        res.json = function json(obj) {
            obj.APIversion = 1;
            res._json(obj);
        };
        next();
    });

    // All routes definition goes here
    router.get('/', main.index);

    // authentication routes
    router.post('/auth/login', auth.login);
    router.post('/auth/signup', auth.signup);

    // user routes
    router.get('/user/:id',authorization.isAuthenticated,user.fetch);
    router.put('/user/:id',authorization.isAuthenticated,user.update);
    router.post('/user/logout', user.logout);

    // test
    router.put('/users', authorization.isAuthenticated, user.index);


    //note
        router.post('/user/note', authorization.isAuthenticated, note.create);
        router.get('/user/note/list', authorization.isAuthenticated, note.list);
        router.get('/user/note/list/:id', authorization.isAuthenticated, note.show);
        router.put('/user/note/update/:id', authorization.isAuthenticated, note.update);
        router.delete('/user/note/delete/:id', authorization.isAuthenticated, note.delete);

    return router;
};
