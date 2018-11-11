const express = require('express'),
      router = express.Router();
const { isApiLoggedIn } = require('../../middleware/auth');

router.use('/user', isApiLoggedIn, require('./user'));
router.use('/club', isApiLoggedIn, require('./club'));
router.use('/event', isApiLoggedIn, require('./event'));

module.exports = router;
