'use strict';

const _ = require('lodash');
const response = require('./../../../config/responses');
const error = require('./../../../config/constants/error');

// load necessary models
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    index: (req, res) => {
        res.json({success: true, message: "UserController_v1#index"});
    },

    update: (req, res) => {
        User.findById(req.params.id)
            .then((user) => {
                if(!user) return response.notFound(res, error.E_USER_NOT_FOUND);

                let reqData = req.body;
                // TODO: emailHelper - updateEmail
                // TODO: companyHelper - create/update company
                // TODO: update user's details

                user.first_name = reqData.first_name;
                user.last_name  = reqData.last_name;                
                user.phone      = reqData.phone;
                user.location   = reqData.location;
                user.timezone   = reqData.timezone;
                    

                
                // let rData = req.body;
                // let condition = {id: user.id};
                // let data = {
                    
                // };
                user.save(function (err) {
                    if(err) {
                        return response.error(res, err);
                    }
                });

                return response.ok(res, user);
            })
            .catch((err) => {
                response.error(res, err);
            });
    },

    fetch: (req, res) => {
        User.findOne({'_id':req.params.id,'token':req.headers.authorization})
            .then((user) => {
                if(!user) return response.notFound(res, error.E_USER_NOT_FOUND);

                return response.ok(res, user);
            })
            .catch((err) => {
                response.error(res, err);
            });
    }

};
