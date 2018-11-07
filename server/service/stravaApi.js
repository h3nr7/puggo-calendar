const axios = require('axios');
const URL = `${process.env.STRAVA_API_URL}/${process.env.STRAVA_API_VER}`;

function __constructHeader({accessToken}) {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken || ''}`
  };
}

exports.getStravaUserProfile = function(accessToken) {
  if(!accessToken) return Promise.reject();
  const headers = __constructHeader({accessToken});

  return axios({
    method: 'get',
    url: `${URL}/athlete`,
    headers
  });
};

exports.getClubById = function(accessToken, id) {
  if(!accessToken) return Promise.reject();
  const headers = __constructHeader({accessToken});

  return axios({
    method: 'get',
    url: `${URL}/clubs/${id}`,
    headers
  });
};
