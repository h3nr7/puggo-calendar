const express = require('express'),
      router = express.Router();
const { createEvent, findAnEvent, findAdminEvent } = require('../../controller/api/event');
const { apiSuccessHandler } = require('../../helper/successHandler');

/**
 * get user profile
 * @type {[type]}
 */
router.post('/', createEvent, apiSuccessHandler);

router.get('/mine', findAdminEvent, apiSuccessHandler);

router.get('/:eventId', findAnEvent, apiSuccessHandler);


module.exports = router;
