require('dotenv').config();
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const bcrypt = require('bcryptjs');

//import user model
const User = require('../models/user');

//log user in on POST
exports.log_in_post = (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(401).json({ 
                error: [
                    {
                        msg: '401 - Unauthorized',
                    },
                ],
                message: info.message,
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            //generate a signed json web token with the user id and type and return it in the response
            const token = jwt.sign({ user_id: user._id.toString(), user_type: user.user_type }, process.env.SESSION_SECRET, { expiresIn: '10h' });
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
                User.findOne({ display_name:  { $regex : new RegExp(value, "i")}})
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
        .custom((value, { req }) => req.body.password === value),
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
                res.status(400).json({
                    errors: errors.array(),
                });
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
                        return next(error);
                    }
                });
            }
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
];

//get user details on GET - protected
exports.user_detail_get = (req, res, next) => {
    //authenticate user token
    passport.authenticate('jwt', { session: false }, async (err, token, info) => {
        try {
            if (err || !token) {
                //if error or no token, then send error
                return res.status(401).json({ 
                    error: [
                        {
                            msg: '401 - Unauthorized',
                        },
                    ],
                    message: info.message,
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
            return next(error);
        }

    })(req, res);
};

//update user up on PUT - protected
exports.user_update_put = [
    //authenticate user token and check token owner id and request id are the same
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, token, info) => {
            //if error or no token, then send error
            if (err || !token) {
                return res.status(401).json({ 
                    error: [
                        {
                            msg: '401 - Unauthorized',
                        },
                    ],
                    message: info.message,
                });;
            }
            //if token id does not match requested id
            if (token.user_id != req.params.id) {
                return res.status(403).json({ 
                    error: [
                        {
                            msg: '401 - Forbidden',
                        },
                    ],
                });;
            }
            //token matches, attach token to req and continue
            req.token = token;
            next();
        })(req, res);
    },
    //sanitise and validate inputs - all optional
    body('display_name', 'Display name is required and must be no longer than 30 characters.')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 20 })
        .escape()
        .custom((value, { req }) => { //check whether display_name already exists in db and is not users own
            return new Promise((resolve, reject) => {
                User.findOne({ display_name:  { $regex : new RegExp(value, "i")}, _id: { $ne: req.params.id } })
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
        .optional({ checkFalsy: true })
        .normalizeEmail()
        .isEmail()
        .escape()
        .custom((value, { req }) => { //check whether email already exists in db and is not users own
            return new Promise((resolve, reject) => {
                User.findOne({ email:  value, _id: { $ne: req.params.id } })
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
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 8, max: 18 }),
    body('passwordConfirm', 'The submitted passwords must match.')
        .custom((value, { req }) => req.body.password === value),
    //process request after validation and sanitisation.
    async (req, res, next) => {
        try {
            //extract the validation errors from a request
            const errors = validationResult(req);
            //check if there are errors present
            if (!errors.isEmpty()) {
                //error(s), send status and errors
                res.status(400).json({ 
                    errors: errors.array(),
                });
            } else {
                //no errors, create an update object containing only inputs provided by user
                const updateVals = {};
                if (req.body.display_name) {
                    updateVals.display_name = req.body.display_name;
                } else if (req.body.email) {
                    updateVals.email = req.body.email;
                } else if (req.body.password) {
                    //if new password entered, hash new password
                    bcrypt.hash(req.body.password, 10, (error, hashedPassword) => {
                        if (error) {
                            return next(error);
                        }
                        updateVals.password = hashedPassword;
                    });
                }
                const updatedUser = await User.findByIdAndUpdate(req.params.id, updateVals, { returnDocument: 'after' })
                res.json({
                    display_name: updatedUser.display_name,
                    email: updatedUser.email,
                    join_date: updatedUser.join_date,
                    user_type: updatedUser.user_type
                });
            };
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
];

//handle user delete on DELETE
exports.user_delete = [
    //authenticate user token and check token owner id and request id are the same
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, token, info) => {
            //if error or no token, then send error
            if (err || !token) {
                return res.status(401).json({ 
                    error: [
                        {
                            msg: '401 - Unauthorized',
                        },
                    ],
                    message: info.message,
                });
            }
            //if token id does not match requested id
            if (token.user_id != req.params.id) {
                return res.status(403).json({ 
                    error: [
                        {
                            msg: '403 - Forbidden',
                        },
                    ],
                });
            }
            //token matches, attach token to req and continue
            req.token = token;
            next();
        })(req, res);
    },
    //sanitise and validate input password
    body('password', 'Password is required and must be between 8 and 18 characters long.')
        .trim()
        .isLength({ min: 8, max: 18 }),
    body('passwordConfirm', 'The submitted passwords must match.')
        .custom((value, { req }) => req.body.password === value),
    //process request after validation and sanitisation.
    async (req, res, next) => {
        try {
            //extract the validation errors from a request
            const errors = validationResult(req);
            //check if there are errors present
            if (!errors.isEmpty()) {
                //error(s), send status and errors
                res.status(400).json({
                    errors: errors.array(),
                });
            } else {
                //no errors, validate input password
                const user = await User.findById(req.params.id);
                const result = await bcrypt.compare(req.body.password, user.password);
                if (result) {
                    // passwords match, delete user
                    await User.deleteOne({ _id: req.params.id });
                    res.json({ message: "User deleted"})
                } else {
                    // passwords do not match! send error
                    res.status(401).json({ 
                        error: [
                            {
                                msg: '401 - Unauthorized',
                            },
                        ],
                    });
                }
            };
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
];