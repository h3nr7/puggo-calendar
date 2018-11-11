const { EventModel } = require('../../model/Event');
const { UserModel } = require('../../model/User');
const { modelCreatePromiseThen, modelGetPromiseThen } = require('../../helper/successHandler');
const { modelPromiseCatch } = require('../../helper/errorHandler');

/**
 * create event
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.createEvent = function(req, res, next) {
  const { body, user } = req || {};
  const { _id } = user || {};

  EventModel.create({ admin: _id, created_at: new Date(), ...body })
    .then(modelCreatePromiseThen(req, next))
    .catch(modelPromiseCatch(next));
};

/**
 * find event by event id
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.findAnEvent = function(req, res, next) {
  const { params, user } = req || {};
  const { eventId } = params || {};
  const { _id } = user || {};

  EventModel.findOne({ admin: _id, _id: eventId })
    .then(function(doc) {
      const { admin, isPublic, isDraft } = doc || {};
      if(admin.toString() !== _id) {
        if(!isPublic || isDraft) return Promise.reject('user permission denied');
      }
      return Promise.resolve(doc);
    })
    .then(modelGetPromiseThen(req, next))
    .catch(modelPromiseCatch(next));
};

/**
 * find admin events
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.findAdminEvent = function(req, res, next) {
  const { user } = req || {};
  const { _id } = user || {};

  EventModel.find({admin: _id})
    .then(modelGetPromiseThen(req, next))
    .catch(modelPromiseCatch(next));
};
