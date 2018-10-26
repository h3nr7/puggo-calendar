const OAuth2Strategy = require('passport-oauth2');

function StravaStrategy(passport) {
  const STRAVA_URL = `${process.env.STRAVA_API_URL}/api/${process.env.STRAVA_API_VER}`;
  passport.use(new OAuth2Strategy({
    authorizationURL: `${STRAVA_URL}/oauth/authorize`,
    tokenURL: `${STRAVA_URL}/oauth/token`,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.BASE_URL + '/oauth/strava/callback'
  }, function(accessToken, refreshToken, profile, cb) {
    console.log('me too', accessToken, refreshToken, profile);
    return cb(null, {accessToken, refreshToken, profile});
  }));

  passport.serializeUser(function(user, cb) {
    console.log(user);
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    cb(null, id);
  });
}

module.exports = StravaStrategy;
