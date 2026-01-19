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
    <title>Inspektionsverwaltung - Admin</title>
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
            <a href="/admin/pages/inspections.php" class="nav-link active"><i class="fas fa-clipboard-check"></i><span>Inspektionen</span></a>
            <a href="/admin/pages/users.php" class="nav-link"><i class="fas fa-users"></i><span>Benutzer</span></a>
            <a href="/admin/pages/settings.php" class="nav-link"><i class="fas fa-cog"></i><span>Einstellungen</span></a>
        </nav>
        <div class="sidebar-footer">
            <a href="/admin/logout.php" class="logout-btn"><i class="fas fa-sign-out-alt"></i><span>Abmelden</span></a>
        </div>
    </aside>
    <main class="admin-main">
        <header class="admin-header">
            <h1>Inspektionsverwaltung</h1>
            <div class="header-actions">
                <button class="btn btn-primary" onclick="alert('Neue Inspektion hinzufügen - Coming Soon')"><i class="fas fa-plus"></i>Neue Inspektion</button>
            </div>
        </header>
        <div class="admin-content">
            <div class="card">
                <div class="card-body">
                    <table class="data-table">
                        <thead>
                            <tr><th>Datum</th><th>Kennzeichen</th><th>Typ</th><th>Prüfer</th><th>Bewertung</th><th>Aktionen</th></tr>
                        </thead>
                        <tbody id="inspectionsTable"><tr><td colspan="6" class="loading">Lädt Inspektionen...</td></tr></tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
    <script src="/admin/assets/js/admin.js"></script>
    <script>
    async function loadInspections() {
        try {
            const res = await AdminAPI.get('/inspections.php');
            const inspections = res.data || [];
            const tbody = document.getElementById('inspectionsTable');
            if (!inspections.length) { tbody.innerHTML = '<tr><td colspan="6" class="no-data">Keine Inspektionen</td></tr>'; return; }
            tbody.innerHTML = inspections.map(i => \`<tr>
                <td>\${formatDate(i.date)}</td>
                <td><strong>\${i.licensePlate}</strong></td>
                <td>\${i.type}</td>
                <td>\${i.inspector}</td>
                <td>\${getStatusBadge(i.overallRating)}</td>
                <td class="table-actions"><button class="btn btn-sm btn-secondary" onclick="alert('Bearbeiten - Coming Soon')"><i class="fas fa-edit"></i></button></td>
            </tr>\`).join('');
        } catch(e) { showAlert('Fehler beim Laden', 'danger'); }
    }
    document.addEventListener('DOMContentLoaded', loadInspections);
    </script>
</body>
</html>
