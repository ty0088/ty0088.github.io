require('dotenv').config();
const { body, validationResult } = require("express-validator");
const async = require('async');
const jwt = require('jsonwebtoken');
const passport = require("passport");

//import user model
const User = require('../models/user');

//log user in on POST
exports.log_in_post = (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message,
                user,
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user, process.env.SESSION_SECRET, { expiresIn: '24h' });
            return res.json({ user, token });
        });
    })(req, res);
};

//log user out on POST
exports.log_out_post = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.json({ messages: 'logged out' });
    });
};

//sign user up on POST
exports.sign_up_post = [
    //sanitise and validate inputs
    body('display_name', 'Display name is required and must be no longer than 30 characters.')
        .trim()
        .isLength({ min: 1, max: 20 })
        .escape()
        .custom(value => {
            return new Promise((resolve, reject) => {
                User.findOne({ display_name:  value})
                    .then(nameExists => {
                        if (nameExists !== null) {
                            reject(new Error('Display name already exists.'));
                        } else {
                            resolve(true);
                        }
                    });
            });
        }),
    body('email', 'Email is required')
        .normalizeEmail()
        .isEmail()
        .escape()
        .custom(value => {
            return new Promise((resolve, reject) => {
                User.findOne({ email:  value})
                    .then(emailExists => {
                        if (emailExists !== null) {
                            reject(new Error('Email already exists.'));
                        } else {
                            resolve(true);
                        }
                    });
            });
        }),
    body('password', 'Password is required and must be between 6 and 12 characters long.')
        .trim()
        .isLength({ min: 6, max: 12 }),
    body('passwordConfirm', 'The submitted passwords must match.')
        .custom((val, { req }) => req.body.password === val),
    //process request after validation and sanitisation.
    async (req, res, next) => {
        try {
            //extract the validation errors from a request.
            const errors = validationResult(req);
            
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
];