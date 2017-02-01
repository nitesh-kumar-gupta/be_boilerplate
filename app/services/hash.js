'use strict';

const bCrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const sh = require('shorthash');

module.exports = {
    generate: (text) => {
        const salt = bCrypt.genSaltSync(10);
        return bCrypt.hashSync(text, salt);
    },

    compare: (plain, hashed) => {
        return bCrypt.compareSync(plain, hashed);
    },

    generateUrlFriendly: (email) => {
        console.log('Crypto mail: ', email);
        return crypto.createHmac('md5', process.env.SECRET)
            .update(email + Date.now())
            .digest('hex') + '-' + sh.unique(email);
    }

};
