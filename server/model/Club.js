const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const Schema = new mongoose.Schema({
  id: String,
  name: String,
  profile_medium: String,
  profile: String,
  cover_photo: String,
  cover_photo_small: String,
  sport_type: String,
  city: String,
  state: String,
  country: String,
  modified_at: {type: Date, default: Date.now },
  created_at: Date,
});

// PLUGIN
Schema.plugin(findOrCreate);

const Model = mongoose.model('Club', Schema);

module.exports = {
  ClubModel: Model,
  ClubSchema: Schema
};
