require('dotenv').config();
const { body, validationResult } = require("express-validator");
const async = require('async'); // -------------------
const jwt = require('jsonwebtoken');
const passport = require("passport");
const bcrypt = require('bcryptjs');

//import user model
const User = require('../models/user');

//log user in on POST
exports.log_in_post = (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: '400 - There was an issue logging in',
                err,
                info
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign({ user_id: user._id.toString() }, process.env.SESSION_SECRET, { expiresIn: '24h' });
            return res.json({ message: "Auth Passed", userId: user._id, token });
        });
    })(req, res);
};

//sign user up on POST
exports.sign_up_post = [
    //sanitise and validate inputs
    body('display_name', 'Display name is required and must be no longer than 30 characters.')
        .trim()
        .isLength({ min: 1, max: 20 })
        .escape()
        .custom(value => { //check whether display_name already exists in db
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
    body('email', 'Email is required and in an email format')
        .normalizeEmail()
        .isEmail()
        .escape()
        .custom(value => { //check whether email already exists in db
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
    body('password', 'Password is required and must be between 8 and 18 characters long.')
        .trim()
        .isLength({ min: 8, max: 18 }),
    body('passwordConfirm', 'The submitted passwords must match.')
        .custom((val, { req }) => req.body.password === val),
    //process request after validation and sanitisation.
    async (req, res, next) => {
        try {
            //extract the validation errors from a request.
            const errors = validationResult(req);
            //create a new user object
            const user = new User({
                    display_name: req.body.display_name,
                    email: req.body.email,
            });
            //check if there are errors present
            if (!errors.isEmpty()) {
                //error(s), send status and errors
                res.status(400).json({ message: "400 - Bad Request", errors: errors.array() });
            } else {
                //no errors, hash password and save user to db and send succcess message
                bcrypt.hash(req.body.password, 10, async (error, hashedPassword) => {
                    try {
                        if (error) {
                            return next(error);
                        }
                        user.password = hashedPassword,
                        await user.save();
                        res.status(201).json({ message: "201 - User Created" })
                    } catch (error) {
                        next(error);
                    }
                });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
];

//get user details on GET
exports.user_detail_get = (req, res, next) => {
    //authenticate user token
    passport.authenticate('jwt', { session: false }, async (err, token, info) => {
        try {
            if (err || !token) {
                //if error or no token, then send error
                console.log(info);
                return res.status(400).json({
                    message: '400 - Bad Request'
                });
            }
            //user token verified, query db for requested user's id
            const queryUser = await User.findById(req.params.id);
            if (!queryUser) {
                //if requested user not found, return error
                const err = new Error("Requested user not found");
                err.status = 404;
                return next(err);
            }
            //requested user found, check if user is requesting their own details or someone elses
            let userDetails = {};
            if (token.user_id === req.params.id) {
                //user requesting own details, send all user detail
                userDetails = {
                    display_name: queryUser.display_name,
                    email: queryUser.email,
                    join_date: queryUser.join_date,
                    user_type: queryUser.user_type
                };
            } else {
                //user is requesting someone elses details, send reduced detail
                userDetails = {
                    display_name: queryUser.display_name,
                    join_date: queryUser.join_date,
                    user_type: queryUser.user_type
                };
            }
            res.json(userDetails);
        } catch (error) {
            console.log(error);
            next(error);
        }

    })(req, res);
};