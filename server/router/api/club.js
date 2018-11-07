const express = require('express'),
      router = express.Router();
const { findAndUpdateClub } = require('../../controller/api/club');
const { apiSuccessHandler } = require('../../helper/successHandler');

/**
 * get user profile
 * @type {[type]}
 */
router.get('/:id', findAndUpdateClub, apiSuccessHandler);

module.exports = router;
