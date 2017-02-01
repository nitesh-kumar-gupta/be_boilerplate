'use strict';

const ok = require('./ok');
const created = require('./created');
const error = require('./error');
const unauthorized = require('./unauthorized');
const notFound = require('./not-found');

module.exports = {
    ok: ok,
    created: created,
    error: error,
    unauthorized: unauthorized,
    notFound: notFound
};
