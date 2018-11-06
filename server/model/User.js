const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const Schema = new mongoose.Schema({
  id: String,
  username: String,
  firstname: String,
  lastname: String,
  created_at: { type: Date },
  modified_at: { type: Date, default: Date.now }
});

// PLUGIN
Schema.plugin(findOrCreate);

const Model = mongoose.model('User', Schema);

module.exports = {
  UserModel: Model,
  UserSchema: Schema
};
