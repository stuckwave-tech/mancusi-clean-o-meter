const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  licensePlate: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    enum: ['VW', 'Audi', 'Skoda', 'Seat', 'Cupra', 'VW Nutzfahrzeuge']
  },
  model: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Demo', 'Vorführwagen', 'Leihwagen', 'Intern'],
    required: true
  },
  vin: {
    type: String,
    required: true,
    unique: true
  },
  year: {
    type: Number,
    required: true
  },
  color: String,
  mileage: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Verfügbar', 'Verliehen', 'In Inspektion', 'In Reinigung', 'Nicht Verfügbar'],
    default: 'Verfügbar'
  },
  currentUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  images: [{
    type: String
  }],
  notes: String
}, {
  timestamps: true
});

// Index für schnellere Suche
vehicleSchema.index({ licensePlate: 1, status: 1 });

module.exports = mongoose.model('Vehicle', vehicleSchema);
