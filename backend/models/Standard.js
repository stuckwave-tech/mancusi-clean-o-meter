const mongoose = require('mongoose');

const standardSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Interior', 'Exterior', 'General'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: [{
    item: String,
    level: { type: String, enum: ['Muss', 'Sollte', 'Optional'] }
  }],
  images: [String],
  active: {
    type: Boolean,
    default: true
  },
  priority: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Standard', standardSchema);
