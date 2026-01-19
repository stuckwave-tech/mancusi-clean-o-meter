const express = require('express');
const router = express.Router();

// Qualitätsstandards basierend auf der Präsentation
const standards = [
  {
    id: '1',
    category: 'Interior',
    title: 'Innenraum reinigen',
    description: 'Vor der Rückgabe Müll entfernen und grobe Verschmutzungen beseitigen.',
    requirements: [
      { item: 'Fußräume und Matten reinigen', level: 'Muss' },
      { item: 'Sitze von Schmutz befreien', level: 'Muss' },
      { item: 'Dashboard abstauben', level: 'Sollte' },
      { item: 'Kofferraum aufräumen', level: 'Muss' }
    ],
    active: true,
    priority: 1
  },
  {
    id: '2',
    category: 'Exterior',
    title: 'Äußeres prüfen',
    description: 'Das Fahrzeug muss stets einen ordentlichen und vorzeigbaren Eindruck machen.',
    requirements: [
      { item: 'Karosserie von grobem Schmutz befreien', level: 'Muss' },
      { item: 'Reifen und Felgen reinigen', level: 'Sollte' },
      { item: 'Fenster außen säubern', level: 'Sollte' },
      { item: 'Kennzeichen lesbar halten', level: 'Muss' }
    ],
    active: true,
    priority: 2
  },
  {
    id: '3',
    category: 'General',
    title: 'Sauberkeits-Standard',
    description: 'Jedes Fahrzeug muss sauber zurückgegeben werden. Dies gilt für alle: Kunden, Mitarbeiter und interne Fahrten.',
    requirements: [
      { item: 'Fahrzeug in repräsentativem Zustand zurückgeben', level: 'Muss' },
      { item: 'Keine sichtbaren Verschmutzungen', level: 'Muss' },
      { item: 'Bei starker Verschmutzung: Professionelle Reinigung veranlassen', level: 'Muss' }
    ],
    images: ['/assets/images/qualitaetsanspruch.jpg'],
    active: true,
    priority: 0
  }
];

// GET all standards
router.get('/', (req, res) => {
  const { category, active } = req.query;
  let filtered = standards;
  
  if (category) filtered = filtered.filter(s => s.category === category);
  if (active !== undefined) filtered = filtered.filter(s => s.active === (active === 'true'));
  
  // Sort by priority
  filtered.sort((a, b) => a.priority - b.priority);
  
  res.json({
    success: true,
    count: filtered.length,
    data: filtered
  });
});

// GET single standard
router.get('/:id', (req, res) => {
  const standard = standards.find(s => s.id === req.params.id);
  
  if (!standard) {
    return res.status(404).json({
      success: false,
      error: 'Standard nicht gefunden'
    });
  }
  
  res.json({
    success: true,
    data: standard
  });
});

module.exports = router;
