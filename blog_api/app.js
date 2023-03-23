require('dotenv').config()
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
require('./passport');

const userRoute = require('./routes/user');
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
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Blog API' });
});

app.use('/user', userRoute);

// error handler
app.use(function(err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.json(err);
  });

app.listen(port, () => console.log(`Server started on port ${port}`));