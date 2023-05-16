const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const bcrypt = require('bcryptjs');
const secrets = require('./storage/blog-api-secrets.json');

const User = require('./models/user');

passport.use(new LocalStrategy(
    {
        //options
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, cb) => {
        try {
            let res = null;
            //query db for user email
            const user = await User.findOne({ email });
            if (!user) {
                //email not found return false user
                return cb(null, false, { message: "Email and/or password is incorrect, please try again." });
            }
            if (email === 'demo@demo') {
                //if demo account, authenticate user without password check
                res = true;
            } else {
                //email found and not demo account, compare password with hash
                res = await bcrypt.compare(password, user.password);
            }
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

const cookieExtractor = (req) => {
    //extract token from cookie
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
}


passport.use(new JWTStrategy(
    {
        //options
        jwtFromRequest: cookieExtractor,
        secretOrKey : secrets.SESSION_SECRET,
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