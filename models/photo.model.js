const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  id: {
    type: String,
    required: 'This field is required'
  },
  pageURL: {
    type: String,
    required: 'This field is required'
  }
});

mongoose.model("Photo", photoSchema);
