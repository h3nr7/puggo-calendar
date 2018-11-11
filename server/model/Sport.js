const mongoose = require('mongoose');

const SportSchema = new mongoose.Schema({
  title: String,
  description: String,
  isMultiSport: Boolean
});

const SportModel = mongoose.models.Sport || mongoose.model('Sport', SportSchema);

module.exports = {
  SportSchema,
  SportModel
};
