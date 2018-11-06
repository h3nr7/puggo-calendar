
/**
 * API success handler
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.apiSuccessHandler = function(req, res) {
  const { response } = req || {};
  const { status, data } = response;
  res.status(status).json(data);
};
