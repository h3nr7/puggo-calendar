const { getStravaUserProfile } = require('../../service/stravaApi');
const { UserModel } = require('../../model/User');
const { modelPromiseCatch } = require('../../helper/errorHandler');
/**
 * get and save user Profile
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.getUserProfile = function(req, res, next) {
  const { accessToken } = req.user || {};

  let stravaProfile = {};
  return getStravaUserProfile(accessToken)
    .then(function(obj) {
      const { data } = obj || {};
      const { id } = data || {};
      stravaProfile = data;
      return UserModel.findOne({id});
    })
    .then(function(data) {
      let status = 200;
      if(data.modified_at === data.created_at) {
        status = 201;
      }

      req.response = {
        status, data: { ...data.toJSON(), ...stravaProfile }
      };
      next(null);
    })
    .catch(modelPromiseCatch(next));
};
