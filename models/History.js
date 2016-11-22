const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  term: {
    type: String,
    required: true
  },
  when: {
    type: Number,
    required: true
  }
});


module.exports = mongoose.model('History', historySchema);
