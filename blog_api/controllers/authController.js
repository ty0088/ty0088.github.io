require('dotenv').config();
const jwt = require('jsonwebtoken');
const passport = require("passport");

//log user in on POST
exports.log_in_post = (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            const error = new Error("Unauthorized");
            error.status = 401;
            error.message = info.message;
            return next(error);
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                return next(err);
            }
            //generate a signed json web token with the user data
            const payload = { 
                user_id: user._id.toString(),
                display_name: user.display_name,
                user_type: user.user_type, 
            };
            const options = { expiresIn: process.env.NODE_ENV === 'development' ? '30 days' : '10h' };
            const token = jwt.sign(payload, process.env.SESSION_SECRET, options);
            //save token to http only cookie and return success message
            res.cookie('jwt', token, { httpOnly: true, sameSite: 'None', secure: true });
            return res.json({ message: "Log in successful" });
        });
    })(req, res);
};

//handle log out on POST 
exports.user_log_out_post = (req, res, next) => {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.status(200).json({ message: 'User successfully logged out' });
};

//handle user self authentication on GET
exports.user_authenticate_GET = [
    //authenticate user token if any
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            //if auth error, return error
            if (err) {
                const err = new Error("Unauthorized");
                err.status = 401;
                return next(err);
            }
            //if user token valid then set user to req
            if (user) {
                req.user = user;
            }
            next();
        })(req, res, next);
    },
    async (req, res, next) => {
        try {
            //check for user validation
            if (!req.user) {
                //if no user, send null data
                return res.json({ user: null });
            } else {
                //user validated, send user data
                return res.json({ user: req.user });
            }
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
];

//send tinyMCE key on req from auth user
exports.getTinyKey = [
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            res.status(200).json({ tinyKey: process.env.REACT_APP_TINYMCE_API_KEY });
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
];