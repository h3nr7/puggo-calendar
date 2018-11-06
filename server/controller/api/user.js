const { getStravaUserProfile } = require('../../service/stravaApi');
const { UserModel } = require('../../model/User');

/**
 * get and save user Profile
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.getUserProfile = function(req, res, next) {
  const { accessToken } = req.user || {};
  const curDate = new Date();

  let stravaProfile = {};
  return getStravaUserProfile(accessToken)
    .then(function(obj) {
      const { data } = obj || {};
      stravaProfile = data;
      const { id, firstname, lastname, username } = data || {};
      return UserModel.findOrCreate({id}, {firstname, lastname, username}, {});
    })
    .then(function(obj){
      const { doc, created } = obj || {};
      let updateObj = { modified_at: curDate };
      if(created) updateObj = { created_at: curDate, ...updateObj};
      return UserModel.findOneAndUpdate({id: doc.id}, updateObj);
    })
    .then(function(data) {
      let status = 200;
      if(data.modified_at === data.created_at) {
        status = 201;
      }

      req.response = {
        status, data: { ...stravaProfile, ...data }
      };
      next(null);
    })
    .catch(function(err) {
      console.error(err);
      next(err);
    });
};
