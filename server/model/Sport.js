const mongoose = require('mongoose');

const SportSchema = new mongoose.Schema({
  title: String,
  description: String,
  is_multisport: Boolean
});

const SportModel = mongoose.models.Sport || mongoose.model('Sport', SportSchema);

module.exports = {
  SportSchema,
  SportModel
};
