const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const arrayUniquePlugin = require('mongoose-unique-array');

const Schema = new mongoose.Schema({
  id: String,
  username: String,
  firstname: String,
  lastname: String,
  profile: String,
  profile_medium: String,
  authType: {type: String},
  clubs: [{type: String}],
  created_at: { type: Date },
  modified_at: { type: Date, default: Date.now }
});

// PLUGIN
Schema.plugin(findOrCreate);
Schema.plugin(arrayUniquePlugin);

const UserModel = mongoose.models.User || mongoose.model('User', Schema);

module.exports = {
  UserModel,
  UserSchema: Schema
};
