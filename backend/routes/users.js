const express = require('express');
const router = express.Router();

// Mock users
let users = [
  {
    id: '1',
    firstName: 'Max',
    lastName: 'Mustermann',
    email: 'max.mustermann@autohaus-vatterott.de',
    role: 'Manager',
    department: 'Qualitätssicherung',
    employeeId: 'AV-001',
    active: true
  }
];

// GET all users
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: users.length,
    data: users
  });
});

// GET single user
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'Benutzer nicht gefunden'
    });
  }
  
  res.json({
    success: true,
    data: user
  });
});

// POST create user
router.post('/', (req, res) => {
  const newUser = {
    id: String(users.length + 1),
    active: true,
    ...req.body
  };
  
  users.push(newUser);
  
  res.status(201).json({
    success: true,
    data: newUser
  });
});

module.exports = router;
