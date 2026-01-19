<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Mock data for vehicles
$vehicles = [
    [
        'id' => '1',
        'licensePlate' => 'OS-VT 123',
        'brand' => 'VW',
        'model' => 'Multivan',
        'type' => 'Vorführwagen',
        'vin' => 'WV2ZZZ7HZPH012345',
        'year' => 2024,
        'color' => 'Weiß',
        'mileage' => 5420,
        'status' => 'Verfügbar',
        'images' => ['/public/assets/images/qualitaetsanspruch.jpg']
    ],
    [
        'id' => '2',
        'licensePlate' => 'OS-VT 456',
        'brand' => 'VW',
        'model' => 'T6.1',
        'type' => 'Demo',
        'vin' => 'WV2ZZZ7HZPH067890',
        'year' => 2024,
        'color' => 'Grau',
        'mileage' => 3200,
        'status' => 'Verliehen',
        'images' => []
    ],
    [
        'id' => '3',
        'licensePlate' => 'OS-VT 789',
        'brand' => 'Audi',
        'model' => 'Q5',
        'type' => 'Vorführwagen',
        'vin' => 'WAUZZZ8R8DA012345',
        'year' => 2024,
        'color' => 'Schwarz',
        'mileage' => 8100,
        'status' => 'Verfügbar',
        'images' => []
    ]
];

// Handle GET requests
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get single vehicle
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $vehicle = null;
        
        foreach ($vehicles as $v) {
            if ($v['id'] === $id) {
                $vehicle = $v;
                break;
            }
        }
        
        if ($vehicle) {
            echo json_encode([
                'success' => true,
                'data' => $vehicle
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'error' => 'Fahrzeug nicht gefunden'
            ]);
        }
        exit();
    }
    
    // Get all vehicles with optional filters
    $filtered = $vehicles;
    
    if (isset($_GET['status'])) {
        $filtered = array_filter($filtered, function($v) {
            return $v['status'] === $_GET['status'];
        });
    }
    
    if (isset($_GET['brand'])) {
        $filtered = array_filter($filtered, function($v) {
            return $v['brand'] === $_GET['brand'];
        });
    }
    
    if (isset($_GET['type'])) {
        $filtered = array_filter($filtered, function($v) {
            return $v['type'] === $_GET['type'];
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
    
    $newVehicle = [
        'id' => (string)(count($vehicles) + 1),
        'licensePlate' => $data['licensePlate'] ?? '',
        'brand' => $data['brand'] ?? '',
        'model' => $data['model'] ?? '',
        'type' => $data['type'] ?? '',
        'vin' => $data['vin'] ?? '',
        'year' => $data['year'] ?? 2024,
        'color' => $data['color'] ?? '',
        'mileage' => $data['mileage'] ?? 0,
        'status' => 'Verfügbar',
        'images' => $data['images'] ?? []
    ];
    
    http_response_code(201);
    echo json_encode([
        'success' => true,
        'data' => $newVehicle
    ]);
    exit();
}

// Method not allowed
http_response_code(405);
echo json_encode([
    'success' => false,
    'error' => 'Method not allowed'
]);
