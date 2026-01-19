<?php
require_once __DIR__ . '/../includes/config.php';
requireLogin();
$user = getCurrentUser();
$adminUsers = getAdminUsers();
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Benutzerverwaltung - Admin</title>
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
            <a href="/admin/pages/users.php" class="nav-link active"><i class="fas fa-users"></i><span>Benutzer</span></a>
            <a href="/admin/pages/settings.php" class="nav-link"><i class="fas fa-cog"></i><span>Einstellungen</span></a>
        </nav>
        <div class="sidebar-footer">
            <a href="/admin/logout.php" class="logout-btn"><i class="fas fa-sign-out-alt"></i><span>Abmelden</span></a>
        </div>
    </aside>
    <main class="admin-main">
        <header class="admin-header">
            <h1>Benutzerverwaltung</h1>
            <div class="header-actions">
                <button class="btn btn-primary" onclick="alert('Neuer Benutzer - Coming Soon')"><i class="fas fa-user-plus"></i>Neuer Benutzer</button>
            </div>
        </header>
        <div class="admin-content">
            <div class="card">
                <div class="card-body">
                    <table class="data-table">
                        <thead>
                            <tr><th>Name</th><th>E-Mail</th><th>Rolle</th><th>Erstellt am</th><th>Aktionen</th></tr>
                        </thead>
                        <tbody>
                            <?php foreach ($adminUsers as $adminUser): ?>
                            <tr>
                                <td><strong><?= htmlspecialchars($adminUser['firstName'] . ' ' . $adminUser['lastName']) ?></strong></td>
                                <td><?= htmlspecialchars($adminUser['email']) ?></td>
                                <td><span class="badge badge-info"><?= htmlspecialchars($adminUser['role']) ?></span></td>
                                <td><?= htmlspecialchars($adminUser['createdAt']) ?></td>
                                <td class="table-actions">
                                    <button class="btn btn-sm btn-secondary" onclick="alert('Bearbeiten - Coming Soon')"><i class="fas fa-edit"></i></button>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
    <script src="/admin/assets/js/admin.js"></script>
</body>
</html>
