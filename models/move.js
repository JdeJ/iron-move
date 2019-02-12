const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const moveSchema = new Schema({
  name: String,
  origin: String,
  destination: String,
  userID: {
    type: ObjectId,
    ref: 'User',
  },
});

const Move = mongoose.model('Move', moveSchema);

module.exports = Move;
