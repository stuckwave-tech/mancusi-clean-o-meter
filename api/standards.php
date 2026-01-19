<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Quality standards based on presentation
$standards = [
    [
        'id' => '1',
        'category' => 'Interior',
        'title' => 'Innenraum reinigen',
        'description' => 'Vor der Rückgabe Müll entfernen und grobe Verschmutzungen beseitigen.',
        'requirements' => [
            ['item' => 'Fußräume und Matten reinigen', 'level' => 'Muss'],
            ['item' => 'Sitze von Schmutz befreien', 'level' => 'Muss'],
            ['item' => 'Dashboard abstauben', 'level' => 'Sollte'],
            ['item' => 'Kofferraum aufräumen', 'level' => 'Muss']
        ],
        'active' => true,
        'priority' => 1
    ],
    [
        'id' => '2',
        'category' => 'Exterior',
        'title' => 'Äußeres prüfen',
        'description' => 'Das Fahrzeug muss stets einen ordentlichen und vorzeigbaren Eindruck machen.',
        'requirements' => [
            ['item' => 'Karosserie von grobem Schmutz befreien', 'level' => 'Muss'],
            ['item' => 'Reifen und Felgen reinigen', 'level' => 'Sollte'],
            ['item' => 'Fenster außen säubern', 'level' => 'Sollte'],
            ['item' => 'Kennzeichen lesbar halten', 'level' => 'Muss']
        ],
        'active' => true,
        'priority' => 2
    ],
    [
        'id' => '3',
        'category' => 'General',
        'title' => 'Sauberkeits-Standard',
        'description' => 'Jedes Fahrzeug muss sauber zurückgegeben werden. Dies gilt für alle: Kunden, Mitarbeiter und interne Fahrten.',
        'requirements' => [
            ['item' => 'Fahrzeug in repräsentativem Zustand zurückgeben', 'level' => 'Muss'],
            ['item' => 'Keine sichtbaren Verschmutzungen', 'level' => 'Muss'],
            ['item' => 'Bei starker Verschmutzung: Professionelle Reinigung veranlassen', 'level' => 'Muss']
        ],
        'images' => ['/public/assets/images/qualitaetsanspruch.jpg'],
        'active' => true,
        'priority' => 0
    ]
];

// Handle GET requests
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get single standard
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $standard = null;
        
        foreach ($standards as $s) {
            if ($s['id'] === $id) {
                $standard = $s;
                break;
            }
        }
        
        if ($standard) {
            echo json_encode([
                'success' => true,
                'data' => $standard
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'error' => 'Standard nicht gefunden'
            ]);
        }
        exit();
    }
    
    // Get all standards with optional filters
    $filtered = $standards;
    
    if (isset($_GET['category'])) {
        $filtered = array_filter($filtered, function($s) {
            return $s['category'] === $_GET['category'];
        });
    }
    
    if (isset($_GET['active'])) {
        $activeFilter = $_GET['active'] === 'true';
        $filtered = array_filter($filtered, function($s) use ($activeFilter) {
            return $s['active'] === $activeFilter;
        });
    }
    
    // Sort by priority
    usort($filtered, function($a, $b) {
        return $a['priority'] - $b['priority'];
    });
    
    echo json_encode([
        'success' => true,
        'count' => count($filtered),
        'data' => array_values($filtered)
    ]);
    exit();
}

// Method not allowed
http_response_code(405);
echo json_encode([
    'success' => false,
    'error' => 'Method not allowed'
]);
