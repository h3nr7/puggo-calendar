const { getClubById } = require('../../service/stravaApi');
const { ClubModel } = require('../../model/Club');
const { modelPromiseCatch } = require('../../helper/errorHandler');

/**
 * find and update club data
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.findAndUpdateClub = function(req, res, next) {
  const { accessToken } = req.user || {};
  const { type } = req.query || {};
  const { id } = req.params || {};
  const curDate = new Date();
  let clubProfile = {};
  let typeFunc;

  switch(type) {
    case 'strava':
      typeFunc = getClubById(accessToken, id)
          .then(function(obj){
            const { data } = obj || {};
            clubProfile = data || {};
            const {
              id, name, profile_medium, profile, cover_photo,
              cover_photo_small, sport_type, city, state, country } = data || {};

            return ClubModel.findOrCreate({id}, {
              id, name, profile_medium, profile, cover_photo,
              cover_photo_small, sport_type, city, state, country}, {});
          })
          .then(function(obj){
            const { doc, created } = obj || {};
            let updateObj = { modified_at: curDate };
            if(created) updateObj = { created_at: curDate, updateObj };

            return ClubModel.findOneAndUpdate({id: doc.id}, updateObj, {new: true});
          })
          .then(function(doc){ return doc.toJSON(); });
      break;
    default:
      typeFunc = ClubModel.findOne({id}).then(function(doc){ return doc.toJSON(); });
      break;
  }

  typeFunc
    .then(function(data) {
      let status = 200;
      if(data.modified_at === data.created_at) {
        status = 201;
      }

      req.response = {
        status, data: { ...clubProfile, ...data }
      };
      next(null);
    })
    .catch(modelPromiseCatch(next));
};
