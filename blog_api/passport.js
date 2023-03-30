const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcryptjs');

const User = require('./models/user');

passport.use(new LocalStrategy(
    {
        //options
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, cb) => {
        try {
            //query db for user email
            const user = await User.findOne({ email });
            if (!user) {
                //email not found
                return cb(null, false, { message: "Email and/or password is incorrect, please try again." });
            }
            //email found, compare password with hash
            const res = await bcrypt.compare(password, user.password);
            if (res) {
                // passwords match, return user obj 
                return cb(null, user, { message: 'Logged In Successfully' });
            } else {
                // passwords do not match!
                return cb(null, false, { message: "Email and/or password is incorrect, please try again." });
            }
        } catch (error) {
            return cb(error);
        }
    },
));


passport.use(new JWTStrategy(
    {
        //options
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey : process.env.SESSION_SECRET,
    },
    async (jwtPayload, cb) => {
        try {
            const user = await User.findById(jwtPayload.user_id);
            if (user) {
                return cb(null, jwtPayload);
            }
            return cb(null, false);
        } catch (error) {
            return cb(error, false)
        }
    },
));