const passport = require('passport'),
      express = require('express'),
      router = express.Router();
      const { getUserProfile } = require('../../controller/api/user');


router.get('/strava', passport.authenticate('strava', { scope: ['public'] }));

router.get('/strava/callback',
  passport.authenticate('strava', { failureRedirect: '/login' }),
  getUserProfile,
  function(req, res) {
    res.redirect('/');
  }
);

module.exports = router;
