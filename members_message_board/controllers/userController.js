const passport = require("passport");
const bcrypt = require('bcryptjs');
const { body, validationResult } = require("express-validator");
const async = require('async');

//import models
const User = require('../models/user');
const Message = require('../models/message')

//render log in form on GET
exports.log_in_get = (req, res, next) => {
    //check req for any stored error message
    if (req.session.messages) {
        //if there is a message, store error message, 
        //then clear req.session.message so that it does not continue to build error messages
        const sessionMessage = req.session.messages[0];
        req.session.messages = undefined;
        //render log in page with latest error message
        res.render('login_form', {
            title: 'Messageboard - Log In',
            errors: [{ msg: sessionMessage }]
        });
    } else {
        //if no errors and render log in page
        res.render('login_form', {
            title: 'Messageboard - Log In'
        });
    }

}

//authenticate user on log in on POST
exports.log_in_post = passport.authenticate('local', {
    successRedirect: '/messages',
    failureRedirect: '/log-in',
    failureMessage: true
});


//log user out on GET
exports.log_out = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/messages");
    });
};

//render sign up form on GET
exports.signup_get = (req, res, next) => {
    res.render('user_form', {
        title: 'Messageboard - Sign Up',
        goToUrl: 'goToUrl("/")'
    });
};

//submit user to db on POST
exports.signup_post = [
    //sanitise and validate inputs
    body('username')
        .trim()
        .isLength({ min: 1, max: 20 }).withMessage('A username is required and must be no longer than 20 characters.')
        .not().matches(/(\[.*?\])/).withMessage('Username cannot contain characters wrapped in square brackets i.e. [Username].')
        .escape(),
    body('password', 'A password is required and must be between 8 and 12 characters long.')
        .trim()
        .isLength({ min: 8, max: 12 }),
    body('passwordConfirm', 'The submitted passwords must match.')
        .exists()
        .custom((val, { req }) => req.body.password === val),
    body('firstName', 'Your first name is required.')
        .trim()
        .notEmpty(),
    body('lastName', 'Your last name is required.')
        .trim()
        .notEmpty(),
        
    //process request after validation and sanitisation.
    async (req, res, next) => {
        try {
            //extract the validation errors from a request.
            const errors = validationResult(req);
            //create a new user object without passwords
            const user = new User({
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            });
            //check if there are errors present
            if (!errors.isEmpty()) {
                //if there are errors render sign up form again with errors and previously entered data (except passwords)
                res.render('user_form', {
                    title: 'Messageboard - Sign Up',
                    goToUrl: 'goToUrl("/")',
                    currUser: user,
                    errors: errors.array()
                });
            } else {
                //check if username already exists
                const nameRepeatCheck = await User.findOne({ username: { $regex : new RegExp(req.body.username, "i")} });
                if (nameRepeatCheck != null) {
                    //if item name already exists re-render form with error
                    let err = null;
                    err = new Error('Username already exists');
                    err.msg = 'This username already exists, please submit a different one.';
                    err.status = 409;
                    res.render('user_form', {
                        title: 'Messageboard - Sign Up',
                        goToUrl: 'goToUrl("/")',
                        currUser: user,
                        errors: [err]
                    });
                } else {
                    //no errors, hash password and save user to db and redirect to log in page
                    bcrypt.hash(req.body.password, 10, async (error, hashedPassword) => {
                        try {
                            if (error) {
                            return next(error);
                            }
                            user.password = hashedPassword,
                            await user.save();
                            res.render('login_form', {title: 'Messageboard - Success! Log In'});
                        } catch (error) {
                            next(error);
                        }
                    });
                }
            }
        } catch (error) {
            next(error);
        };
    }
];

//render user detail page
exports.user_detail = async (req, res, next) => {
    try {
        //query db for count of user messages
        const messageCount = await Message.countDocuments({ user: req.params.id });
        //calculate total pages required for user messages based on 10 per page
        const totalPages = Math.ceil(messageCount / 10);
        const currPage = req.params.page == undefined ? 1 : parseInt(req.params.page);
        const skipAmount = (currPage - 1) * 10;
        //query db for user and messages by this user (sort by post date)
        const results = await async.parallel({
            userMessages: async () => Message.find({ user: req.params.id }).populate('user lastEditBy').sort({ postDate: -1 }).limit(10).skip(skipAmount),
            reqUser: async () => User.findById(req.params.id)
        });
        res.render('user_detail', {
            title: `Message Board - User Details`,
            reqId: req.params.id,
            userMessages: results.userMessages,
            reqUser: results.reqUser,
            currPage,
            totalPages
        });
    } catch (error) {
        next(error);
    }
};

//render user update form on GET
exports.user_update_get = async (req, res, next) => {
    try {
        //verify user has sufficient privileges to do this action
        //check that user is logged in and request id is same as logged in user id
        if (!req.user || (req.params.id != req.user._id)) {
            //request id and user id does not match, throw error
            let err = new Error("Unauthorised request - Insufficient privileges");
            err.status = 401;
            return next(err);
        }
        //find user
        const user = await User.findById(req.params.id.toString());
        if (user == null) {
            //if user not found, return error
            const err = new Error("User not found");
            err.status = 404;
            return next(err);
        } else {
            res.render('user_form', {
                title: 'Messageboard - Update User Details',
                goToUrl: `goToUrl("/user/${req.params.id}")`,
                currUser: user
            });
        }
    } catch (error) {
        next(error);
    }
};

//submit changes to user on POST
exports.user_update_post = [
    //sanitise and validate inputs
    body('username', 'A username is required and must be no longer than 20 characters.')
        .trim()
        .isLength({ min: 1, max: 20 })
        .escape(),
    body('password', 'A password is required and must be between 8 and 12 characters long.')
        .optional({ checkFalsy: true })
        .isLength({ min: 8, max: 12 }),
    body('passwordConfirm', 'The submitted passwords must match.')
        //if password has been filled in then check that it matches
        .if((val, {req}) => req.body.password)
        .custom((val, { req }) => req.body.password === val),
    body('firstName', 'Your first name is required.')
        .notEmpty(),
    body('lastName', 'Your last name is required.')
        .notEmpty(),
    
    //process request after validation and sanitisation.
    async (req, res, next) => {
        try {
            //verify user has sufficient privileges to do this action
            //check that user is logged in and request id is same as logged in user id
            if (!req.user || (req.params.id != req.user._id)) {
                //request id and user id does not match, throw error
                let err = new Error("Unauthorised request - Insufficient privileges");
                err.status = 401;
                return next(err);
            }
            //user has suffcient privileges
            //extract the validation errors from a request
            const errors = validationResult(req);
            //create a new user object without passwords
            const user = new User({
                _id: req.user._id,
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            });
            //check if there are errors present
            if (!errors.isEmpty()) {
                //if there are errors render sign up form again with errors and previously entered data (except passwords)
                res.render('user_form', {
                    title: 'Messageboard - Sign Up',
                    goToUrl: `goToUrl("/user/${req.params.id}")`,
                    currUser: user,
                    errors: errors.array()
                });
            } else {
                //no errors then check if username already exists
                const nameRepeatCheck = await User.findOne({ username: { $regex : new RegExp(req.body.username, "i")}, _id: { $ne: req.params.id } });
                if (nameRepeatCheck != null) {
                    //if item name already exists re-render form with error
                    let err = null;
                    err = new Error('Username already exists');
                    err.msg = 'This username already exists, please submit a different one.';
                    err.status = 409;
                    res.render('user_form', {
                        title: 'Messageboard - Sign Up',
                        goToUrl: `goToUrl("/user/${req.params.id}")`,
                        currUser: user,
                        errors: [err]
                    });
                } else {
                    //no errors and name is unique, check if user attempted to change password
                    if (req.body.password) {
                        //if password is changed, hash password and update user along with new password
                        bcrypt.hash(req.body.password, 10, async (error, hashedPassword) => {
                            if (error) {
                                return next(error);
                            }
                            user.password = hashedPassword;
                            await User.findByIdAndUpdate(req.user._id, user, {});
                            res.redirect(user.url);
                        });
                    } else {
                        //if no password input, update user (with same password) in db and redirect to user
                        await User.findByIdAndUpdate(req.user._id, user, {});
                        res.redirect(user.url);
                    }
                }
            }
        } catch (error) {
            next(error);
        };
    }
];

//render user delete page on GET
exports.user_delete_get = (req, res, next) => {
    //check that user is logged in and request id is same as logged in user id
    if (!req.user || (req.params.id != req.user._id)) {
        //request id and user id does not match, throw error
        const err = new Error("Unauthorised request - Insufficient privileges");
        err.status = 401;
        return next(err);
    }
    //if ids match, render user delete page
    res.render('user_delete', {
        title: 'Messageboard - Delete User Account',
        goToUrl: `goToUrl("/user/${req.params.id}")`
    });
};

//handle user delete on POST
exports.user_delete_post = async (req, res, next) => {
    try {
        //check that user is logged in and request id is same as logged in user id
        if (!req.user || (req.params.id != req.user._id)) {
            //request id and user id does not match, throw error
            const err = new Error("Unauthorised request - Insufficient privileges");
            err.status = 401;
            return next(err);
        }
        //query db for user and user messages
        const results = await async.parallel({
            user: async () => User.findById(req.params.id),
            userMessages: async () => Message.find({ user: req.params.id }),
        });
        //check if user was found
        if (results.user == null) {
            //if no user found, return error
            const err = new Error("User not found");
            err.status = 404;
            return next(err);
        }
        //check if any user messsages found
        if (results.userMessages != null) {
            //messages found, edit each message user id to "0"
            results.userMessages.forEach(async (message) => {
                message.user = null;
                await Message.findByIdAndUpdate(message._id, message, {});
            });
        }
        //if user found, delete from db
        await results.user.deleteOne({ _id: req.body.userId });
        res.redirect('/');
    } catch (error) {
        next(error);
    }
};