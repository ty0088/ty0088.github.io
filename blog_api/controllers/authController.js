require('dotenv').config();
const jwt = require('jsonwebtoken');
const passport = require("passport");

//log user in on POST
exports.log_in_post = (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            const err = new Error("Unauthorized");
            err.status = 401;
            err.info = info;
            return next(err);
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            //generate a signed json web token with the user id and type and return it in the response
            const token = jwt.sign({ user_id: user._id.toString(), user_type: user.user_type }, process.env.SESSION_SECRET, { expiresIn: process.env.NODE_ENV === 'development' ? '30 days' : '10h' });
            //save token to http only cookie and return success message
            res.cookie('token', token, { httpOnly: true });
            return res.json({ message: "Log in successful", userId: user._id, token });
        });
    })(req, res);
};