require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('./passport');

const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const commentRoute = require('./routes/comment');

const port = process.env.PORT || 3000;
const app = express();

// Set up mongoose connection
(async () => {
    try {
      const dbConn = await mongoose.connect( process.env.DB_CONN, { useUnifiedTopology: true, useNewUrlParser: true });
      console.log(`MongoDB Connected: ${dbConn.connection.host}`);
    } 
    catch (error) {
      console.log(error);
    }
})();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

app.use(function(req, res, next) {
  const allowedOrigins = ['http://localhost:8000', 'http://localhost:8001'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
}});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Blog API' });
});

app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/post', commentRoute); // comment routes - '/post/:postId/comment'

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    //send error
    console.log(err);
    res.status(err.status || 500).json({ error: {status: err.status || 500, message: err.message} });
});

app.listen(port, () => console.log(`Server started on port ${port}`));