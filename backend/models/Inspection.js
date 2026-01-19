const mongoose = require('mongoose');

const inspectionSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  inspector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['Abholung', 'Rückgabe', 'Routine', 'Schaden'],
    required: true
  },
  
  // Sauberkeits-Checks
  cleanliness: {
    interior: {
      floor: {
        status: { type: String, enum: ['Sauber', 'Verschmutzt', 'Stark verschmutzt'], required: true },
        notes: String
      },
      seats: {
        status: { type: String, enum: ['Sauber', 'Verschmutzt', 'Stark verschmutzt'], required: true },
        notes: String
      },
      dashboard: {
        status: { type: String, enum: ['Sauber', 'Verschmutzt', 'Stark verschmutzt'], required: true },
        notes: String
      },
      trunk: {
        status: { type: String, enum: ['Sauber', 'Verschmutzt', 'Stark verschmutzt'], required: true },
        notes: String
      }
    },
    exterior: {
      body: {
        status: { type: String, enum: ['Sauber', 'Verschmutzt', 'Stark verschmutzt'], required: true },
        notes: String
      },
      wheels: {
        status: { type: String, enum: ['Sauber', 'Verschmutzt', 'Stark verschmutzt'], required: true },
        notes: String
      },
      windows: {
        status: { type: String, enum: ['Sauber', 'Verschmutzt', 'Stark verschmutzt'], required: true },
        notes: String
      }
    }
  },
  
  // Schäden
  damages: [{
    location: String,
    severity: { type: String, enum: ['Gering', 'Mittel', 'Schwer'] },
    description: String,
    images: [String]
  }],
  
  // Allgemeine Bewertung
  overallRating: {
    type: String,
    enum: ['Akzeptabel', 'Reinigung erforderlich', 'Inakzeptabel'],
    required: true
  },
  
  // Maßnahmen
  actionRequired: {
    cleaning: { type: Boolean, default: false },
    repair: { type: Boolean, default: false },
    detailing: { type: Boolean, default: false }
  },
  
  estimatedCost: Number,
  completedAt: Date,
  
  // Fotos
  images: [{
    url: String,
    category: String,
    timestamp: { type: Date, default: Date.now }
  }],
  
  signature: {
    inspector: String,
    customer: String,
    timestamp: Date
  },
  
  notes: String,
  
  status: {
    type: String,
    enum: ['Offen', 'In Bearbeitung', 'Abgeschlossen', 'Storniert'],
    default: 'Offen'
  }
}, {
  timestamps: true
});

// Indizes für Performance
inspectionSchema.index({ vehicle: 1, createdAt: -1 });
inspectionSchema.index({ inspector: 1, status: 1 });
inspectionSchema.index({ overallRating: 1 });

module.exports = mongoose.model('Inspection', inspectionSchema);
