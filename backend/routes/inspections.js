const express = require('express');
const router = express.Router();

// Mock data
let inspections = [
  {
    id: '1',
    vehicleId: '1',
    licensePlate: 'OS-VT 123',
    inspector: 'Max Mustermann',
    type: 'Rückgabe',
    date: new Date().toISOString(),
    cleanliness: {
      interior: {
        floor: { status: 'Stark verschmutzt', notes: 'Fußmatten mit Schmutz und Dreck' },
        seats: { status: 'Verschmutzt', notes: 'Flecken auf Rücksitz' },
        dashboard: { status: 'Sauber', notes: '' },
        trunk: { status: 'Verschmutzt', notes: 'Lose Gegenstände' }
      },
      exterior: {
        body: { status: 'Stark verschmutzt', notes: 'Sichtbare Schlamm- und Dreckspuren' },
        wheels: { status: 'Stark verschmutzt', notes: 'Felgen verschmutzt' },
        windows: { status: 'Verschmutzt', notes: 'Außen verschmutzt' }
      }
    },
    damages: [],
    overallRating: 'Inakzeptabel',
    actionRequired: {
      cleaning: true,
      repair: false,
      detailing: true
    },
    estimatedCost: 150,
    status: 'Offen',
    notes: 'Fahrzeug entspricht nicht dem Sauberkeitsstandard und muss professionell gereinigt werden.'
  }
];

// GET all inspections
router.get('/', (req, res) => {
  const { vehicleId, status, type } = req.query;
  let filtered = inspections;
  
  if (vehicleId) filtered = filtered.filter(i => i.vehicleId === vehicleId);
  if (status) filtered = filtered.filter(i => i.status === status);
  if (type) filtered = filtered.filter(i => i.type === type);
  
  res.json({
    success: true,
    count: filtered.length,
    data: filtered
  });
});

// GET single inspection
router.get('/:id', (req, res) => {
  const inspection = inspections.find(i => i.id === req.params.id);
  
  if (!inspection) {
    return res.status(404).json({
      success: false,
      error: 'Inspektion nicht gefunden'
    });
  }
  
  res.json({
    success: true,
    data: inspection
  });
});

// POST create inspection
router.post('/', (req, res) => {
  const newInspection = {
    id: String(inspections.length + 1),
    date: new Date().toISOString(),
    status: 'Offen',
    ...req.body
  };
  
  inspections.push(newInspection);
  
  res.status(201).json({
    success: true,
    data: newInspection
  });
});

// PUT update inspection
router.put('/:id', (req, res) => {
  const index = inspections.findIndex(i => i.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Inspektion nicht gefunden'
    });
  }
  
  inspections[index] = { ...inspections[index], ...req.body };
  
  res.json({
    success: true,
    data: inspections[index]
  });
});

// GET statistics
router.get('/stats/summary', (req, res) => {
  const stats = {
    total: inspections.length,
    byRating: {
      akzeptabel: inspections.filter(i => i.overallRating === 'Akzeptabel').length,
      reinigungErforderlich: inspections.filter(i => i.overallRating === 'Reinigung erforderlich').length,
      inakzeptabel: inspections.filter(i => i.overallRating === 'Inakzeptabel').length
    },
    byStatus: {
      offen: inspections.filter(i => i.status === 'Offen').length,
      inBearbeitung: inspections.filter(i => i.status === 'In Bearbeitung').length,
      abgeschlossen: inspections.filter(i => i.status === 'Abgeschlossen').length
    }
  };
  
  res.json({
    success: true,
    data: stats
  });
});

module.exports = router;
