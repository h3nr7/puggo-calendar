const express = require('express'),
      router = express.Router();
const {
  createEvent, getEvents, findAnEvent, deleteAnEvent,
  findAdminEvent, updateEvent, addEventUser, addEventModerator
} = require('../../controller/api/event');
const { apiSuccessHandler } = require('../../helper/successHandler');

// create event
router.post('/', createEvent, apiSuccessHandler);
// get all events
router.get('/', getEvents, apiSuccessHandler);
// get my events
router.get('/mine', findAdminEvent, apiSuccessHandler);
// get event by id
router.get('/:eventId', findAnEvent, apiSuccessHandler);
// delete an event by id
router.delete('/:eventId', deleteAnEvent, apiSuccessHandler);
// update event by id
router.put('/:eventId', updateEvent, apiSuccessHandler);
// add user to event
router.post('/:eventId/user/:userId', addEventUser, apiSuccessHandler);
// add moderator to event
router.post('/:eventId/moderator/:moderatorId', addEventModerator, apiSuccessHandler);
module.exports = router;
