const express = require('express'),
      router = express.Router();
const { getStravaUserProfile } = require('../../service/stravaApi');

router.get('/profile', function(req, res, next) {
  const { accessToken } = req.user || {};
  console.log('access', accessToken);
  return getStravaUserProfile(accessToken)
    .then(function(obj) {
      const { data } = obj || {};
      console.log('meme', data);
      
      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
      next(err);
    });
});

module.exports = router;
