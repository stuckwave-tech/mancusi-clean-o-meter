const express = require('express');
const router = express.Router();

// Mock data für Entwicklung (später durch DB ersetzen)
let vehicles = [
  {
    id: '1',
    licensePlate: 'OS-VT 123',
    brand: 'VW',
    model: 'Multivan',
    type: 'Vorführwagen',
    vin: 'WV2ZZZ7HZPH012345',
    year: 2024,
    color: 'Weiß',
    mileage: 5420,
    status: 'Verfügbar',
    images: ['/assets/images/qualitaetsanspruch.jpg']
  },
  {
    id: '2',
    licensePlate: 'OS-VT 456',
    brand: 'VW',
    model: 'T6.1',
    type: 'Demo',
    vin: 'WV2ZZZ7HZPH067890',
    year: 2024,
    color: 'Grau',
    mileage: 3200,
    status: 'Verliehen'
  }
];

// GET all vehicles
router.get('/', (req, res) => {
  const { status, type, brand } = req.query;
  let filtered = vehicles;
  
  if (status) filtered = filtered.filter(v => v.status === status);
  if (type) filtered = filtered.filter(v => v.type === type);
  if (brand) filtered = filtered.filter(v => v.brand === brand);
  
  res.json({
    success: true,
    count: filtered.length,
    data: filtered
  });
});

// GET single vehicle
router.get('/:id', (req, res) => {
  const vehicle = vehicles.find(v => v.id === req.params.id);
  
  if (!vehicle) {
    return res.status(404).json({
      success: false,
      error: 'Fahrzeug nicht gefunden'
    });
  }
  
  res.json({
    success: true,
    data: vehicle
  });
});

// POST create vehicle
router.post('/', (req, res) => {
  const newVehicle = {
    id: String(vehicles.length + 1),
    ...req.body,
    status: 'Verfügbar'
  };
  
  vehicles.push(newVehicle);
  
  res.status(201).json({
    success: true,
    data: newVehicle
  });
});

// PUT update vehicle
router.put('/:id', (req, res) => {
  const index = vehicles.findIndex(v => v.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Fahrzeug nicht gefunden'
    });
  }
  
  vehicles[index] = { ...vehicles[index], ...req.body };
  
  res.json({
    success: true,
    data: vehicles[index]
  });
});

// DELETE vehicle
router.delete('/:id', (req, res) => {
  const index = vehicles.findIndex(v => v.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Fahrzeug nicht gefunden'
    });
  }
  
  vehicles.splice(index, 1);
  
  res.json({
    success: true,
    message: 'Fahrzeug gelöscht'
  });
});

module.exports = router;
