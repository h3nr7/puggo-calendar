const mongoose = require('mongoose');

/**
 * Point Schema
 * @type {mongoose}
 */
const PointSchema = new mongoose.Schema({
  type: {
    type: String, // Don't do `{ location: { type: String } }`
    enum: ['Point'], // 'location.type' must be 'Point'
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

/**
 * Location Schema
 * @type {mongoose}
 */
const LocationSchema = new mongoose.Schema({
  name: String,
  location: { type: PointSchema }
});

/**
 * Image Schema
 * @type {mongoose}
 */
const ImageSchema = new mongoose.Schema({
  title: String,
  url: String,
  width: Number,
  height: Number,
  location: LocationSchema
});

module.exports = {
  PointSchema,
  LocationSchema,
  ImageSchema
};
