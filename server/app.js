const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const StravaStrategy = require('./auth/StravaStrategy');


if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const stravaStrategy = StravaStrategy(passport);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
  secret: 'keyboard cat', resave: false, saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/oauth/strava', passport.authenticate('oauth2'));

app.get('/oauth/strava/callback',
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send(`<p>success! ${JSON.stringify(res)}</p>`);
  });


  app.listen(4000);
