const passport = require("passport");

//render log in form
exports.log_in_get = (req, res, next) => {
    res.render('login_form', {title: 'Message Board - Log in'});
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