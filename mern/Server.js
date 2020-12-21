const express = require('express');
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
// const User = require("./Model/passport/User");
const userRouter = require("./Routes/passportRoutes")
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
// Middleware-------------------------------------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require('./Model/passport/passport')(passport);
app.use('/user',userRouter);


// Connect to MongoDB

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true,
      useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.get('/', function (req, res) {
  res.send('Hello World')
});
app.use(require('morgan')('dev'));
 
app.listen(PORT, console.log('listing on',PORT))