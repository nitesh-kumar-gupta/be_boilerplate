'use strict';

module.exports = Object.freeze({
    E_UNEXPECTED: {
        code: 'E_UNEXPECTED',
        message: 'Something went wrong!'
    },

    E_NOT_FOUND: {
        code: 'E_NOT_FOUND',
        message: 'Unknown request!'
    },

    E_USER_NOT_FOUND: {
        code: 'E_USER_NOT_FOUND',
        message: 'The requested user account does not exists!'
    },

    E_INVALID_PASSWORD: {
        code: 'E_INVALID_PASSWORD',
        message: 'The password provided is incorrect!'
    },

    E_UNIQUE_EMAIL_VALIDATION: {
        code: 'E_UNIQUE_EMAIL_VALIDATION',
        message: 'Email address is already registered!'
    },
    E_INVALID_EMAIL_VALIDATION: {
        code: 'E_INVALID_EMAIL_VALIDATION',
        message: 'Email address is not valid!'
    },

    E_UNIQUE_USERNAME_VALIDATION: {
        code: 'E_UNIQUE_USERNAME_VALIDATION',
        message: 'Username is already registered!'
    },

    E_UNIQUE_UNIDENTIFIED_VALIDATION: {
        code: 'E_UNIQUE_UNIDENTIFIED_VALIDATION',
        message: 'Unique validation failed!'
    },

    E_NOTE_NOT_FOUND: {
        code: 'E_NOTE_NOT_FOUND',
        message: 'Note not found!'
    }

});
