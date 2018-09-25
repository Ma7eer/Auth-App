// TODO: create two schemas for user profile and user auth 
// TODO: think about if you want to create another form for a user profile or
// just one
/* PORT is set on package.json file under config */
const PORT = process.env.npm_package_config_port || 3000;
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  flash = require('connect-flash'),
  morgan = require('morgan'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  configDB = require('./config/database.js');

// CONNECT TO MONGODB
mongoose.connect(configDB.url);

require('./config/passport.js')(passport); // pass passport for configuration

// SETUP EXPRESS APP
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true})); // get information from html forms
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static(__dirname + '/public')); // use static files at public directory

// PASSPORT CONFIGURATION
app.use(session({ secret: 'authishardauthishardauthishard' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

/* eslint-disable-next-line no-console */
app.listen(PORT, () => console.log(`listening on port ${PORT}`));