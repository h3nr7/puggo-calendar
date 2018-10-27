const express = require('express'),
      router = express.Router();


router.use('/oauth', require('./oauth'));

router.get('/', function(req, res) {
  const { accessToken, profile } = req.user || {};
  const { displayName } = profile || {};
  res.send(`<p>hello ${displayName} ${accessToken}</p>`);
});

module.exports = router;
