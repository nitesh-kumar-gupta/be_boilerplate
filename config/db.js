'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = (app, config) => {
    if (app.get('env') === 'development')
        mongoose.set('debug', true);
    // connect to mongoose
    const options = {server: {socketOptions: {keepAlive: 1}}};
    mongoose.connect(config.db, options, () => {
        if (process.env.RESET_DB === 'RESET') {
            console.log('Resetting the database');
            var collections = mongoose.connection.collections;
            _.forEach(collections, function(value, key) {
                var collection = mongoose.connection.collections[key];
                //collection.drop();
            });
            require('./seed/index').run();
        }
    });

    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + config.db);
    });

    mongoose.connection.once('open', () => {
        console.log('Connected to mongodb!');
    });

    mongoose.connection.on('error', function(err) {
        console.error('Mongoose default connection error: ' + err);
    });

    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
};
