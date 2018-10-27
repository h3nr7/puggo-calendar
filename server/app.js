const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const StravaOAuth = require('./helper/StravaOAuth');
const appInfo = require('../package.json');
const { name, version } = appInfo;
const { apiErrorHandler } = require('./helper/errorHandler');

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// OAUTH STRATEGY
StravaOAuth(passport);

// INITIALISE EXPRESS
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// CONTROLLERS
app.use(require('./controller'));

// ERROR HANDLER AND LOGGERS
app.use(methodOverride());
app.use(apiErrorHandler);


// INIT APP
app.listen(process.env.PORT, function() {
  console.log(`:: ${name} v${version} - Initialised at port ${process.env.PORT} `);
});
