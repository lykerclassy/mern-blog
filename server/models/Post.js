const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String }, // Optional for future use
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);