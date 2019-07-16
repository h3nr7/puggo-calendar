const { Strategy } = require('passport-strava-oauth2');
const { UserModel } = require('../model/User');

/**
  Strava oauth
*/
function StravaOAuth(passport) {
  passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.BASE_URL + '/oauth/strava/callback'
  }, function(accessToken, refreshToken, profile, cb) {
    return cb(null, {accessToken, refreshToken, profile});
  }));

  /**
    Serialise user
    */
  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      const { _json } = user.profile || {};
      const {
        id, firstname, lastname,
        username, profile, profile_medium, clubs } = _json || {};
      const modClubs = Array.isArray(clubs) ? clubs.map(function(obj){ return obj.id; }) : [];

      UserModel.findOrCreate({id}, {firstname, lastname, username, profile, profile_medium, clubs: modClubs}, {})
        .then(function(obj) {
          const { doc, created } = obj || {};
          const { _id } = doc || {};
          const curDate = new Date();
          let updateObj = {modified_at: curDate, firstname, lastname, username, profile, profile_medium};
          if(created) updateObj = { created_at: curDate, clubs: modClubs};
          return UserModel.findOneAndUpdate({_id}, updateObj);
        })
        .then(function(doc){
          const { _id } = doc || {};
          cb(null, {...user, _id});
        })
        .catch(function(err){
          cb(err);
        });
    });
  });

  /**
    deserialise
    */
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
}

module.exports = StravaOAuth;
