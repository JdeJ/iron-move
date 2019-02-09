const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const boxSchema = new Schema({
  name: String,
  description: String,
  moveID: {
    type: ObjectId,
    ref: 'Move',
  },
});

const Box = mongoose.model('Box', boxSchema);

module.exports = Box;
