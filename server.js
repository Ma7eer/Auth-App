const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  Router = require('./routes/routes.js');

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/* use static files */
app.use(express.static(__dirname + '/public'));

/* set view engine to ejs */
app.set('view engine', 'ejs');

/* PORT is set on package.json file under config */
const PORT = process.env.npm_package_config_port || 3000;

/* root route*/
app.get('/', Router.root);

/* sign in */
app.get('/signin', Router.signUp);

/* log in */
app.get('/login', Router.logIn);

/* profile page */
app.get('/profile/:username', Router.profile);

/* eslint-disable-next-line no-console */
app.listen(PORT, () => console.log(`listening on port ${PORT}`));