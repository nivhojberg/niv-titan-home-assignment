const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'This field is required'
  },
  fullName: {
    type: String,
    required: 'This field is required'
  },
  fullAddress: {
    type: String,
    required: 'This field is required'
  },
  imagesURLs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo',
    required: 'This field is required'
  }],
  frameColor: {
    type: String,
    required: 'This field is required'
  },
  user: {
    type: String,
    required: 'This field is required'
  },
});

mongoose.model("Order", orderSchema);
