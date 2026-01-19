<?php
session_start();

// Database simulation - in production use real database
define('ADMIN_USERS_FILE', __DIR__ . '/../../data/admin_users.json');
define('DATA_DIR', __DIR__ . '/../../data');

// Ensure data directory exists
if (!file_exists(DATA_DIR)) {
    mkdir(DATA_DIR, 0755, true);
}

// Security functions
function hashPassword($password) {
    return password_hash($password, PASSWORD_BCRYPT);
}

function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}

// Session management
function requireLogin() {
    if (!isset($_SESSION['admin_user'])) {
        header('Location: /admin/login.php');
        exit;
    }
}

function getCurrentUser() {
    return $_SESSION['admin_user'] ?? null;
}

function isLoggedIn() {
    return isset($_SESSION['admin_user']);
}

function login($email, $password) {
    $users = getAdminUsers();
    
    foreach ($users as $user) {
        if ($user['email'] === $email && verifyPassword($password, $user['password'])) {
            $_SESSION['admin_user'] = [
                'id' => $user['id'],
                'email' => $user['email'],
                'firstName' => $user['firstName'],
                'lastName' => $user['lastName'],
                'role' => $user['role']
            ];
            return true;
        }
    }
    
    return false;
}

function logout() {
    session_destroy();
    header('Location: /admin/login.php');
    exit;
}

// Admin users management
function getAdminUsers() {
    if (!file_exists(ADMIN_USERS_FILE)) {
        // Create default admin user
        $defaultUsers = [
            [
                'id' => 1,
                'email' => 'admin@vatterott.de',
                'password' => hashPassword('admin123'),
                'firstName' => 'Admin',
                'lastName' => 'Vatterott',
                'role' => 'admin',
                'createdAt' => date('Y-m-d H:i:s')
            ]
        ];
        saveAdminUsers($defaultUsers);
        return $defaultUsers;
    }
    
    return json_decode(file_get_contents(ADMIN_USERS_FILE), true) ?? [];
}

function saveAdminUsers($users) {
    file_put_contents(ADMIN_USERS_FILE, json_encode($users, JSON_PRETTY_PRINT));
}

function createAdminUser($email, $password, $firstName, $lastName, $role = 'admin') {
    $users = getAdminUsers();
    
    // Check if email exists
    foreach ($users as $user) {
        if ($user['email'] === $email) {
            return false;
        }
    }
    
    $newUser = [
        'id' => count($users) + 1,
        'email' => $email,
        'password' => hashPassword($password),
        'firstName' => $firstName,
        'lastName' => $lastName,
        'role' => $role,
        'createdAt' => date('Y-m-d H:i:s')
    ];
    
    $users[] = $newUser;
    saveAdminUsers($users);
    
    return $newUser;
}

function updateAdminUser($id, $data) {
    $users = getAdminUsers();
    
    foreach ($users as &$user) {
        if ($user['id'] == $id) {
            if (isset($data['email'])) $user['email'] = $data['email'];
            if (isset($data['firstName'])) $user['firstName'] = $data['firstName'];
            if (isset($data['lastName'])) $user['lastName'] = $data['lastName'];
            if (isset($data['role'])) $user['role'] = $data['role'];
            if (isset($data['password']) && !empty($data['password'])) {
                $user['password'] = hashPassword($data['password']);
            }
            $user['updatedAt'] = date('Y-m-d H:i:s');
            break;
        }
    }
    
    saveAdminUsers($users);
    return true;
}

function deleteAdminUser($id) {
    $users = getAdminUsers();
    $users = array_filter($users, function($user) use ($id) {
        return $user['id'] != $id;
    });
    
    saveAdminUsers(array_values($users));
    return true;
}

// Response helpers
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

function errorResponse($message, $statusCode = 400) {
    jsonResponse(['success' => false, 'error' => $message], $statusCode);
}

function successResponse($data = null, $message = 'Success') {
    jsonResponse(['success' => true, 'message' => $message, 'data' => $data]);
}

// CSRF protection
function generateCsrfToken() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verifyCsrfToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}
