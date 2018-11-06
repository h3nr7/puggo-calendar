const mongoose = require('mongoose');


exports.initDB = function() {
  const url = process.env.MONGO_URL;
  const options = {
    // ssl: true,
    // sslValidate: false,
    // // sslCA: [process.env.COMPOSE_MONGO_CA],
    // // ca: [process.env.COMPOSE_MONGO_CA],
    poolSize: 5,
    reconnectTries: 1,
    useNewUrlParser: true
    // socketOptions: {keepAlive: 1, connectTimeoutMS: 30000},
    // auto_reconnect: true,
  };

  mongoose.Promise = Promise;

  return mongoose.connect(url, options)
    .then(function(obj){
      console.log('mongo success: ');
    })
    .catch(function(err) {
      console.log('mongo error: ', err);
    });
};
