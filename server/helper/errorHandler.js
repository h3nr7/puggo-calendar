
exports.apiErrorHandler = function(err, req, res, next) {
  console.error('handled API Error', err.stack);
  // if (req.xhr) {
    res.status(400).json({error: 'API Error'});
  // } else {
  //   next(err);
  // }
};
