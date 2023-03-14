const passport = require("passport");
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { body, validationResult } = require("express-validator");

//render log in form
exports.log_in_get = (req, res, next) => {
    res.render('login_form', {title: 'Messageboard - Log In'});
}

//authenticate user on log in
exports.log_in_post = passport.authenticate('local', {
    successRedirect: '/messages',
    failureRedirect: '/login'
});

//log user out
exports.log_out = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/messages");
    });
};

//render sign up form
exports.signup_get = (req, res, next) => {
    res.render('signup_form', {
        title: 'Messageboard - Sign Up',
        goToUrl: 'goToUrl("/")'
    });
};

//submit user to db
exports.signup_post = [
    //sanitise and validate inputs
    body('username', 'A username is required and must be no longer than 10 characters')
        .trim()
        .isLength({ min: 1, max: 10 })
        .escape(),
    body('password', 'A password is required and must be between 8 and 12 characters long.')
        .isLength({ min: 8, max: 12 }),
    body('passwordConfirm', 'The submitted passwords must match')
        .exists()
        .custom((val, { req }) => req.body.password === val),
    body('firstName', 'Your first name is required.')
        .notEmpty(),
    body('lastName', 'Your last name is required.')
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
                res.render('signup_form', {
                    title: 'Messageboard - Sign Up',
                    goToUrl: 'goToUrl("/")',
                    currUser: user,
                    errors: errors.array()
                });
            } else {
                //check if username already exists
                const nameRepeatCheck = await User.findOne({ username: { $regex : new RegExp(req.body.username, "i")} });
                console.log(nameRepeatCheck);
                if (nameRepeatCheck != null) {
                    //if item name already exists re-render form with error
                    let err = null;
                    err = new Error('Username already exists');
                    err.msg = 'This username already exists, please submit a different one.';
                    err.status = 409;
                    res.render('signup_form', {
                        title: 'Messageboard - Sign Up',
                        goToUrl: 'goToUrl("/")',
                        currUser: user,
                        errors: [err]
                    });
                } else {
                    //no errors, hash password and save user to db and redirect to home
                    bcrypt.hash(req.body.password, 10, async (error, hashedPassword) => {
                        try {
                            if (error) {
                            return next(error);
                            }
                            user.password = hashedPassword,
                            await user.save();
                            res.redirect('/');
                        } catch (error) {
                            console.log(error);
                            next(error);
                        }
                    });
                }
            }
        } catch (error) {
            console.log(error);
            next(error);
        };
    }
];