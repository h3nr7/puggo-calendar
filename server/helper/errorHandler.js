
exports.apiErrorHandler = function(err, req, res, next) {
  console.error('handled API Error', err);
  const { status, message } = err || {};
  if(status && message) {
    return res.status(status).json({error: message});
  }

  // if (req.xhr) {
  res.status(400).json({error: 'Unknown Error'});
  // } else {
  //   next(err);
  // }
};

exports.modelPromiseCatch = function(next) {
  return function(err) {
    const { message, errors, status } = err || {};
    console.log('modelPromiseCatch: ', err);
    next({status: status || 403, message: message || errors || err || 'unknown db error'});
  };
};
