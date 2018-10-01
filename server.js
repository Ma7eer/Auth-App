const PORT = 3000,
  express = require('express'),
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
app.use(session(
  { secret: 'authishardauthishardauthishard', resave:false, saveUninitialized: false })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

/* eslint-disable-next-line no-console */
app.listen(PORT, () => console.log(`listening on port ${PORT}`));