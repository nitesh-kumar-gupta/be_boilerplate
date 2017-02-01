'use strict';
const sh = require('shorthash');
const deAsync = require('deasync');
const moment  = require('moment');
const mailChecker = require('mailchecker'); // disposable email check
// const freeMail = require('freemail'); // company email check
const emailExistence = require('email-existence'); // email exists or not

const self = module.exports = {
    isUnique: (User, email) => {
        let [done, unique] = [false, false];
        User.findOne({ 'email': email })
            .then((user) => {
                if(!user)
                    unique = true;
                done = true;
                return null;
            })
            .catch((err) => {
                done = true;
                return null;
            });
        deAsync.loopWhile(() => { return !done; });
        return unique;
    },

    // setNewEmail: (user, emails) => {
    //     if(emails.old_email !== emails.new_email) {
    //         let index = self.getEmailFromUser(user, emails.old_email);
    //         user.username = self.extractUsernameFromEmail(emails.new_email) + '.' + sh.unique(emails.new_email);
    //         // TODO: change it to check unique username for every user
    //         if(index >= 0) {
    //             user.emails[index].email = emails.new_email;
    //             user.emails[index].verification.complete = false;
    //             user.emails[index].verification.completed_at = null;
    //             // TODO: update verification data
    //             return true;
    //         }
    //     }
    //     return false;
    // },

    validate: (email) => {
        return mailChecker.isValid(email);
    },

    checkExistence: (email) => {
        //return true;
        let [done, valid] = [false, false];
        emailExistence.check(email, (err, result) => {
            done = true;
            valid = result;
            return null;
        });
        deAsync.loopWhile(() => { return !done; });
        return valid;
    },
};
