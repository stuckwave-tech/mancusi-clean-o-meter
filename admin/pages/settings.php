<?php
require_once __DIR__ . '/../includes/config.php';
requireLogin();
$user = getCurrentUser();
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Einstellungen - Admin</title>
    <link rel="stylesheet" href="/styles/main.css">
    <link rel="stylesheet" href="/admin/assets/css/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="admin-body">
    <aside class="admin-sidebar">
        <div class="sidebar-header">
            <h2>🚗 Vatterott Admin</h2>
            <p class="user-info"><?= htmlspecialchars($user['firstName'] . ' ' . $user['lastName']) ?></p>
        </div>
        <nav class="sidebar-nav">
            <a href="/admin/index.php" class="nav-link"><i class="fas fa-tachometer-alt"></i><span>Dashboard</span></a>
            <a href="/admin/pages/vehicles.php" class="nav-link"><i class="fas fa-car"></i><span>Fahrzeuge</span></a>
            <a href="/admin/pages/inspections.php" class="nav-link"><i class="fas fa-clipboard-check"></i><span>Inspektionen</span></a>
            <a href="/admin/pages/users.php" class="nav-link"><i class="fas fa-users"></i><span>Benutzer</span></a>
            <a href="/admin/pages/settings.php" class="nav-link active"><i class="fas fa-cog"></i><span>Einstellungen</span></a>
        </nav>
        <div class="sidebar-footer">
            <a href="/admin/logout.php" class="logout-btn"><i class="fas fa-sign-out-alt"></i><span>Abmelden</span></a>
        </div>
    </aside>
    <main class="admin-main">
        <header class="admin-header">
            <h1>Einstellungen</h1>
        </header>
        <div class="admin-content">
            <div class="dashboard-grid">
                <div class="card">
                    <div class="card-header"><h3>Profil bearbeiten</h3></div>
                    <div class="card-body">
                        <form>
                            <div class="form-group">
                                <label>Vorname</label>
                                <input type="text" value="<?= htmlspecialchars($user['firstName']) ?>" readonly>
                            </div>
                            <div class="form-group">
                                <label>Nachname</label>
                                <input type="text" value="<?= htmlspecialchars($user['lastName']) ?>" readonly>
                            </div>
                            <div class="form-group">
                                <label>E-Mail</label>
                                <input type="email" value="<?= htmlspecialchars($user['email']) ?>" readonly>
                            </div>
                            <button type="button" class="btn btn-secondary" onclick="alert('Profil bearbeiten - Coming Soon')">Profil bearbeiten</button>
                        </form>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header"><h3>System Informationen</h3></div>
                    <div class="card-body">
                        <div class="list-items">
                            <div class="list-item">
                                <div class="item-main"><strong>Version</strong><span class="badge badge-info">1.0.0</span></div>
                                <small>Autohaus Vatterott Quality Management System</small>
                            </div>
                            <div class="list-item">
                                <div class="item-main"><strong>PHP Version</strong><span class="badge badge-success"><?= phpversion() ?></span></div>
                            </div>
                            <div class="list-item">
                                <div class="item-main"><strong>Server</strong><span class="badge badge-info"><?= $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown' ?></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <script src="/admin/assets/js/admin.js"></script>
</body>
</html>
