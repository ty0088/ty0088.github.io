require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

// Set up mongoose connection
(async () => {
  try {
    const dbConn = await mongoose.connect( process.env.DB_CONN, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log(`MongoDB Connected: ${dbConn.connection.host}`);
  } 
  catch (error) {
    console.log(error);
    //direct to no connection error page? ---------------------------------
  }
})();

//import models
const User = require('./models/user');

//import routes
const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      'script-src-attr': ["'unsafe-inline'"]
    }
  },
}));
app.use(express.static(path.join(__dirname, 'public')));

//set up passport module
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Username and/or password is incorrect, please try again" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! check if user is bannded
          if (user.membershipStatus == 'Banned') {
            //user is banned, log in fail and message
            return done(null, false, { message: "User is banned... Uh-oh" });
          }
          //user is not banned, so log user in
          return done(null, user);
        } else {
          // passwords do not match!
          return done(null, false, { message: "Username and/or password is incorrect, please try again" });
        }
      });
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

//set local variable for current user
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
