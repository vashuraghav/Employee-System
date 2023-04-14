const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['customer', 'reseller', 'admin'],
    default: 'customer',
  },
});

module.exports = mongoose.model('User', UserSchema);
