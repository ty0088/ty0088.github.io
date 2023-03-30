const { body, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require('bcryptjs');

//import user model
const User = require('../models/user');

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
            }
            //no errors, hash password and save user to db and send succcess message
            bcrypt.hash(req.body.password, 10, async (error, hashedPassword) => {
                try {
                    if (error) {
                        return next(error);
                    }
                    user.password = hashedPassword,
                    await user.save();
                    res.json({ message: "201 - User Created" })
                } catch (error) {
                    return next(error);
                }
            });
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
];

//get user details on GET - protected
exports.user_detail_get = [
    //authenticate user token
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            //query db for user
            const user = await User.findById(req.params.id);
            if (user === null) {
                //if requested user not found, return error
                const err = new Error("Requested user not found");
                err.status = 404;
                return next(err);
            }
            //requested user found, check if user is requesting their own details or someone elses
            let userDetails = {};
            if (req.user.user_id === req.params.id || req.user.user_type === 'Admin') {
                //user requesting own details or admin, send all user detail
                userDetails = {
                    display_name: user.display_name,
                    email: user.email,
                    join_date: user.join_date,
                    user_type: user.user_type
                };
            } else {
                //user is requesting someone elses details, send reduced detail
                userDetails = {
                    display_name: user.display_name,
                    join_date: user.join_date,
                    user_type: user.user_type
                };
            }
            res.json(userDetails);
        } catch (error) {
            console.log(error);
            return next(error);            
        }
    },
];

//update user up on PUT - protected
exports.user_update_put = [
    //authenticate user token and confirm user prior to any validation/santisation
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            //if error or no user, then send error
            if (err || !user) {
                const err = new Error("Unauthorized");
                err.status = 401;
                return next(err);
            }
            //if user id does not match requested id
            if (user.user_id != req.params.id) {
                const err = new Error("Forbidden");
                err.status = 403;
                return next(err);
            }
            //user matches, attach user to req and continue
            req.user = user;
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
            }
            //no errors, query db for user
            const user = await User.findById(req.params.id);
            //set any changes to user
            if (req.body.display_name) {
                user.display_name = req.body.display_name;
            }
            if (req.body.email) {
                user.email = req.body.email;
            }
            if (req.body.password) {
                //if new password entered, hash new password
                bcrypt.hash(req.body.password, 10, (error, hashedPassword) => {
                    if (error) {
                        return next(error);
                    }
                    updateVals.password = hashedPassword;
                });
            }
            await user.save();
            res.json({
                msg: 'User updated successfully',
                user,
            });
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
];

//handle user delete on DELETE
exports.user_delete = [
    //authenticate user token and confirm user prior to any validation/santisation
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            //if error or no user, then send error
            if (err || !user) {
                const err = new Error("Unauthorized");
                err.status = 401;
                return next(err);
            }
            //if user id does not match requested id
            if (user.user_id != req.params.id) {
                const err = new Error("Forbidden");
                err.status = 403;
                return next(err);
            }
            //user matches, attach user to req and continue
            req.user = user;
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
            }
            //no errors, query db for user
            const user = await User.findById(req.params.id);
            if (user == null) {
                //if no user found, return error
                const err = new Error("User not found");
                err.status = 404;
                return next(err);
            }
            //validate input password
            const result = await bcrypt.compare(req.body.password, user.password);
            if (result) {
                // passwords match, delete user
                await User.deleteOne({ _id: req.params.id });
                res.json({ message: "User deleted"})
            } else {
                // passwords do not match! send error
                const err = new Error("Unauthorized");
                err.status = 401;
                err.info = info;
                return next(err);
            }
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
];