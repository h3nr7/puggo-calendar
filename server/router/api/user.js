const express = require('express'),
      router = express.Router();
const { getUserProfile } = require('../../controller/api/user');
const { apiSuccessHandler } = require('../../helper/successHandler');

/**
 * get user profile
 * @type {[type]}
 */
router.get('/profile', getUserProfile, apiSuccessHandler);

module.exports = router;
