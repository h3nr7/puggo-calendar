const express = require('express'),
      router = express.Router();
const { findAndUpdateClub, getClubMembers } = require('../../controller/api/club');
const { apiSuccessHandler } = require('../../helper/successHandler');

/**
 * get user profile
 * @type {[type]}
 */
router.get('/:id', findAndUpdateClub, apiSuccessHandler);

router.get('/:id/members', getClubMembers, apiSuccessHandler);
module.exports = router;
