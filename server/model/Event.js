const mongoose = require('mongoose');
const arrayUniquePlugin = require('mongoose-unique-array');
const { ImageSchema, LocationSchema } = require('./BaseSchemas');
const { ObjectId } = mongoose.Schema.Types;

const EventTypeSchema = new mongoose.Schema({
  title: String,
  description: String
});

const Schema = new mongoose.Schema({
  title: { type: String, required: true},
  description: String,
  location: LocationSchema,
  cover_photo: ImageSchema,
  cover_photo_small: ImageSchema,
  album: [ImageSchema],
  sport: {type: ObjectId, ref: 'Sport'},
  type: EventTypeSchema,
  tags: [String],
  users: [{type: ObjectId, ref: 'User'}],
  moderators: [{type: ObjectId, ref: 'User'}],
  admin: {type: ObjectId, ref: 'User', required: true},
  club: {type: ObjectId, ref: 'Club'},
  start_date: Date,
  end_date: Date,
  is_draft: {type: Boolean, default: true},
  is_public: {type: Boolean, default: true},
  created_at: { type: Date },
  modified_at: { type: Date, default: Date.now }
});

Schema.plugin(arrayUniquePlugin);

const EventModel = mongoose.models.Event || mongoose.model('Event', Schema);

module.exports = {
  EventModel,
  EventSchema: Schema
};
