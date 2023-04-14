const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema(
  {
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    subject: {
      type: String
    },
    body: {
      type: String,
      required: true,
    },
    thread_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Email',
      default: null,
    },
    reply_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Email',
      default: null,
    },
    order_item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Email', EmailSchema);
