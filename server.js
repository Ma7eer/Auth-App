// TODO: create two schemas for user profile and user auth 
// TODO: think about if you want to create another form for a user profile or
// just one
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  expressSession = require('express-session'),
  User = require('./models/user.js'),
  appRoutes = require('./routes/appRoutes.js'),
  signUpRoutes = require('./routes/signUpRoutes'),
  logInRoutes = require('./routes/logInRoutes.js');

mongoose.connect('mongodb://localhost/authApp');

/* parse application/x-www-form-urlencoded */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/* use static files */
app.use(express.static(__dirname + '/public'));

/* set view engine to ejs */
app.set('view engine', 'ejs');

/* setup passport config */
app.use(expressSession({
  secret: 'All the particles are dancing',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* PORT is set on package.json file under config */
const PORT = process.env.npm_package_config_port || 3000;

app.use(appRoutes, signUpRoutes, logInRoutes);

/* eslint-disable-next-line no-console */
app.listen(PORT, () => console.log(`listening on port ${PORT}`));