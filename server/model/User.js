const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date
});

const Model = mongoose.model('UserModel', Schema);

module.exports = {
  UserModel: Model,
  UserSchema: Schema
};
