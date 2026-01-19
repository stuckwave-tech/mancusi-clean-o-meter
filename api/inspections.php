<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Mock data for inspections
$inspections = [
    [
        'id' => '1',
        'vehicleId' => '1',
        'licensePlate' => 'OS-VT 123',
        'inspector' => 'Max Mustermann',
        'type' => 'Rückgabe',
        'date' => date('c'),
        'cleanliness' => [
            'interior' => [
                'floor' => ['status' => 'Stark verschmutzt', 'notes' => 'Fußmatten mit Schmutz und Dreck'],
                'seats' => ['status' => 'Verschmutzt', 'notes' => 'Flecken auf Rücksitz'],
                'dashboard' => ['status' => 'Sauber', 'notes' => ''],
                'trunk' => ['status' => 'Verschmutzt', 'notes' => 'Lose Gegenstände']
            ],
            'exterior' => [
                'body' => ['status' => 'Stark verschmutzt', 'notes' => 'Sichtbare Schlamm- und Dreckspuren'],
                'wheels' => ['status' => 'Stark verschmutzt', 'notes' => 'Felgen verschmutzt'],
                'windows' => ['status' => 'Verschmutzt', 'notes' => 'Außen verschmutzt']
            ]
        ],
        'damages' => [],
        'overallRating' => 'Inakzeptabel',
        'actionRequired' => [
            'cleaning' => true,
            'repair' => false,
            'detailing' => true
        ],
        'estimatedCost' => 150,
        'status' => 'Offen',
        'notes' => 'Fahrzeug entspricht nicht dem Sauberkeitsstandard und muss professionell gereinigt werden.'
    ],
    [
        'id' => '2',
        'vehicleId' => '3',
        'licensePlate' => 'OS-VT 789',
        'inspector' => 'Anna Schmidt',
        'type' => 'Abholung',
        'date' => date('c', strtotime('-2 days')),
        'cleanliness' => [
            'interior' => [
                'floor' => ['status' => 'Sauber', 'notes' => ''],
                'seats' => ['status' => 'Sauber', 'notes' => ''],
                'dashboard' => ['status' => 'Sauber', 'notes' => ''],
                'trunk' => ['status' => 'Sauber', 'notes' => '']
            ],
            'exterior' => [
                'body' => ['status' => 'Sauber', 'notes' => ''],
                'wheels' => ['status' => 'Sauber', 'notes' => ''],
                'windows' => ['status' => 'Sauber', 'notes' => '']
            ]
        ],
        'damages' => [],
        'overallRating' => 'Akzeptabel',
        'actionRequired' => [
            'cleaning' => false,
            'repair' => false,
            'detailing' => false
        ],
        'estimatedCost' => 0,
        'status' => 'Abgeschlossen',
        'notes' => 'Fahrzeug in einwandfreiem Zustand.'
    ]
];

// Handle GET requests
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get statistics
    if (isset($_GET['action']) && $_GET['action'] === 'stats') {
        $stats = [
            'total' => count($inspections),
            'byRating' => [
                'akzeptabel' => count(array_filter($inspections, function($i) {
                    return $i['overallRating'] === 'Akzeptabel';
                })),
                'reinigungErforderlich' => count(array_filter($inspections, function($i) {
                    return $i['overallRating'] === 'Reinigung erforderlich';
                })),
                'inakzeptabel' => count(array_filter($inspections, function($i) {
                    return $i['overallRating'] === 'Inakzeptabel';
                }))
            ],
            'byStatus' => [
                'offen' => count(array_filter($inspections, function($i) {
                    return $i['status'] === 'Offen';
                })),
                'inBearbeitung' => count(array_filter($inspections, function($i) {
                    return $i['status'] === 'In Bearbeitung';
                })),
                'abgeschlossen' => count(array_filter($inspections, function($i) {
                    return $i['status'] === 'Abgeschlossen';
                }))
            ]
        ];
        
        echo json_encode([
            'success' => true,
            'data' => $stats
        ]);
        exit();
    }
    
    // Get single inspection
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $inspection = null;
        
        foreach ($inspections as $i) {
            if ($i['id'] === $id) {
                $inspection = $i;
                break;
            }
        }
        
        if ($inspection) {
            echo json_encode([
                'success' => true,
                'data' => $inspection
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'error' => 'Inspektion nicht gefunden'
            ]);
        }
        exit();
    }
    
    // Get all inspections with optional filters
    $filtered = $inspections;
    
    if (isset($_GET['vehicleId'])) {
        $filtered = array_filter($filtered, function($i) {
            return $i['vehicleId'] === $_GET['vehicleId'];
        });
    }
    
    if (isset($_GET['status'])) {
        $filtered = array_filter($filtered, function($i) {
            return $i['status'] === $_GET['status'];
        });
    }
    
    if (isset($_GET['type'])) {
        $filtered = array_filter($filtered, function($i) {
            return $i['type'] === $_GET['type'];
        });
    }
    
    echo json_encode([
        'success' => true,
        'count' => count($filtered),
        'data' => array_values($filtered)
    ]);
    exit();
}

// Handle POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $newInspection = array_merge([
        'id' => (string)(count($inspections) + 1),
        'date' => date('c'),
        'status' => 'Offen'
    ], $data);
    
    http_response_code(201);
    echo json_encode([
        'success' => true,
        'data' => $newInspection
    ]);
    exit();
}

// Method not allowed
http_response_code(405);
echo json_encode([
    'success' => false,
    'error' => 'Method not allowed'
]);
