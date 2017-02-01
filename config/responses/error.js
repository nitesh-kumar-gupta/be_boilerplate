'use strict';

const errors = require('./../constants/error');

module.exports = (res, err) => {
    let err_code = 'E_UNEXPECTED';
    if(err.name == 'MongoError' && err.code == 11000) {
        if(err.message.includes("index: emails.email")) {
            err_code = errors.E_UNIQUE_EMAIL_VALIDATION.code;
            err.message = errors.E_UNIQUE_EMAIL_VALIDATION.message;
        }
        else if(err.message.includes("index: username")) {
            err_code = errors.E_UNIQUE_USERNAME_VALIDATION.code;
            err.message = errors.E_UNIQUE_USERNAME_VALIDATION.message;
        }
        else {
            err_code = errors.E_UNIQUE_UNIDENTIFIED_VALIDATION.code;
            err.message = errors.E_UNIQUE_UNIDENTIFIED_VALIDATION.message;
        }
    }

    return res.status(500).send({
        success: false,
        error: {
            code: err.code?err.code:err_code,
            err_trace: err.stack || '',
            err_errors: err.errors || '',
            err_message: err.message || '',
            message: "Something went wrong!"
        }
    });
};
