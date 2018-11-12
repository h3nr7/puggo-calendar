const { EventModel } = require('../../model/Event');
const { UserModel } = require('../../model/User');
const {
   modelCreatePromiseThen, modelGetPromiseThen,
   modelUpdatePromiseThen } = require('../../helper/successHandler');
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

exports.getEvents = function(req, res, next) {
  const { query, user } = req || {};

  EventModel.find({is_draft: false, is_public: true})
    .populate('admin users moderators', 'id username firstname lastname profile_medium profile')
    .then(modelUpdatePromiseThen(req, next))
    .catch(modelPromiseCatch(next));
};

exports.updateEvent = function(req, res, next) {
  const { body, params, user } = req || {};
  const { eventId } = params || {};

  const { title, is_draft, is_public } = body || {};
  let updateObj = { modified_at:  Date()};
  if(title !== undefined || title !== '') updateObj = { title, ...updateObj };
  if(is_draft!==undefined) updateObj = { is_draft, ...updateObj };
  if(is_public!==undefined) updateObj = { is_public, ...updateObj };

  const { _id } = user || {};
  EventModel.findOneAndUpdate({admin: _id, _id: eventId}, updateObj, {new: true})
    .then(function(doc){ return doc.toJSON(); })
    .then(modelUpdatePromiseThen(req, next))
    .catch(modelPromiseCatch(next));
};

/**
 * add event user
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.addEventUser = function(req, res, next) {
  const { params, user } = req || {};
  const adminId = user._id || null;
  const { eventId, userId } = params || {};
  if(adminId === userId) return next({ status: 403, message: 'Cannot add self' });

  UserModel.findOne({id: userId})
    .then(function(doc){
      if(!doc) return Promise.reject({ message: 'User does not exist'});
      const { _id } = doc || {};
      return EventModel.findOneAndUpdate(
          {
            $or:[{admin: adminId}, {moderators:{$in:adminId}}],
            _id: eventId
          },
          {$addToSet: {users: _id}}, {new: true}
        )
        .populate('users moderators', 'id username firstname lastname profile_medium profile');
    })
    .then(modelUpdatePromiseThen(req, next))
    .catch(modelPromiseCatch(next));
};

/**
 * add event moderator
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.addEventModerator = function(req, res, next) {
  const { params, user } = req || {};
  const adminId = user._id || null;
  const { eventId, moderatorId } = params || {};
  if(adminId === moderatorId) return next({ status: 403, message: 'Cannot add self' });

  UserModel.findOne({id: moderatorId})
    .then(function(doc){
      if(!doc) return Promise.reject({ message: 'User does not exist'});
      const { _id } = doc || {};
      return EventModel.findOneAndUpdate({admin: adminId, _id: eventId}, {$addToSet: {moderators: _id}}, {new: true})
        .populate('users moderators', 'id username firstname lastname profile_medium profile');
    })
    .then(modelUpdatePromiseThen(req, next))
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
      const { admin, is_public, is_draft } = doc || {};
      if(admin && admin.toString() !== _id) {
        if(!is_public || is_draft) return Promise.reject('user permission denied');
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
