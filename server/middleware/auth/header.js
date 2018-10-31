

exports.setAuthHeader = function(req, res, next) {
  const { accessToken, profile } = req.user || {};
  res.setHeader("Access-Control-Allow-Headers", 'Authorization');
  res.setHeader("Authorization", `Bearer ${accessToken || ''}`);
  return next();
};
