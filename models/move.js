const mongoose = require('mongoose');

const { Schema } = mongoose;

const moveSchema = new Schema({
  name: String,
  origin: String,
  destination: String,
});

const Move = mongoose.model('Move', moveSchema);

module.exports = Move;
