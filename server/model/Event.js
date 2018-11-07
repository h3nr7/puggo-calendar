const mongoose = require('mongoose');
const arrayUniquePlugin = require('mongoose-unique-array');

const Schema = new mongoose.Schema({
  name: String,
  description: String,
  users: [{type: String, unique: true}],
  club: String,
  start_date: Date,
  end_date: Date
});

Schema.plugin(arrayUniquePlugin);

const Model = mongoose.model('Event', Schema);

module.exports = {
  EventModel: Model,
  EventSchema: Schema
};
