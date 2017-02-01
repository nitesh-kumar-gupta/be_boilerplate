'use strict';

const response = require('./../../../config/responses');
const error = require('./../../../config/constants/error');
const Promise = require("bluebird");
const Notes = require('./../../services/note');

// load necessary models
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Note = mongoose.model('Note');

module.exports = {
    index: (req, res) => {
        res.json({success: true, message: "UserController_v1#index"});
    },

    create: (req, res) => {
        Notes.create(req).then((result) => {
            return response.created(res, result);
        }).catch((err) => {
            return response.error(res, err);
        });
    },
    list: (req, res) => {
        Notes.list(req.headers.authorization).then((result) => {
            return response.ok(res, result);
        }).catch((err) => {
            return response.error(res, err);
        });
    },
    show:(req, res) => {
        Notes.show(req).then((result) => {
            return response.ok(res, result);
        }).catch((err) => {
            return response.error(res, err);
        });
    },
    update:(req, res) => {
        Notes.update(req).then((result) => {
            return response.ok(res, result);
        }).catch((err) => {
                return response.error(res, err);
        });
    },
    delete:(req, res) => {
        Notes.delete(req).then((result) => {
            return response.ok(res, result);
        }).catch((err) => {
            return response.error(res, err);
        });
    }
};
