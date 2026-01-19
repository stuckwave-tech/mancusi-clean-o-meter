<?php
require_once __DIR__ . '/includes/config.php';
requireLogin();

$user = getCurrentUser();
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Autohaus Vatterott</title>
    <link rel="stylesheet" href="/styles/main.css">
    <link rel="stylesheet" href="/admin/assets/css/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="admin-body">
    <!-- Sidebar -->
    <aside class="admin-sidebar">
        <div class="sidebar-header">
            <h2>🚗 Vatterott Admin</h2>
            <p class="user-info"><?= htmlspecialchars($user['firstName'] . ' ' . $user['lastName']) ?></p>
        </div>
        
        <nav class="sidebar-nav">
            <a href="/admin/index.php" class="nav-link active">
                <i class="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </a>
            <a href="/admin/pages/vehicles.php" class="nav-link">
                <i class="fas fa-car"></i>
                <span>Fahrzeuge</span>
            </a>
            <a href="/admin/pages/inspections.php" class="nav-link">
                <i class="fas fa-clipboard-check"></i>
                <span>Inspektionen</span>
            </a>
            <a href="/admin/pages/users.php" class="nav-link">
                <i class="fas fa-users"></i>
                <span>Benutzer</span>
            </a>
            <a href="/admin/pages/settings.php" class="nav-link">
                <i class="fas fa-cog"></i>
                <span>Einstellungen</span>
            </a>
        </nav>
        
        <div class="sidebar-footer">
            <a href="/admin/logout.php" class="logout-btn">
                <i class="fas fa-sign-out-alt"></i>
                <span>Abmelden</span>
            </a>
        </div>
    </aside>
    
    <!-- Main Content -->
    <main class="admin-main">
        <header class="admin-header">
            <h1>Dashboard</h1>
            <div class="header-actions">
                <a href="/" class="btn btn-secondary" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                    Website ansehen
                </a>
            </div>
        </header>
        
        <div class="admin-content">
            <!-- Stats Cards -->
            <div class="stats-grid">
                <div class="stat-card blue">
                    <div class="stat-icon">
                        <i class="fas fa-car"></i>
                    </div>
                    <div class="stat-details">
                        <h3 id="totalVehicles">0</h3>
                        <p>Fahrzeuge</p>
                    </div>
                </div>
                
                <div class="stat-card green">
                    <div class="stat-icon">
                        <i class="fas fa-clipboard-check"></i>
                    </div>
                    <div class="stat-details">
                        <h3 id="totalInspections">0</h3>
                        <p>Inspektionen</p>
                    </div>
                </div>
                
                <div class="stat-card red">
                    <div class="stat-icon">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div class="stat-details">
                        <h3 id="problematic">0</h3>
                        <p>Problematisch</p>
                    </div>
                </div>
                
                <div class="stat-card orange">
                    <div class="stat-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-details">
                        <h3 id="totalUsers">0</h3>
                        <p>Benutzer</p>
                    </div>
                </div>
            </div>
            
            <!-- Recent Activity -->
            <div class="dashboard-grid">
                <div class="card">
                    <div class="card-header">
                        <h3>Neueste Inspektionen</h3>
                        <a href="/admin/pages/inspections.php" class="btn btn-sm btn-secondary">Alle anzeigen</a>
                    </div>
                    <div class="card-body">
                        <div id="recentInspections" class="list-items">
                            <p class="loading">Lädt...</p>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3>Verfügbare Fahrzeuge</h3>
                        <a href="/admin/pages/vehicles.php" class="btn btn-sm btn-secondary">Alle anzeigen</a>
                    </div>
                    <div class="card-body">
                        <div id="availableVehicles" class="list-items">
                            <p class="loading">Lädt...</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="card">
                <div class="card-header">
                    <h3>Schnellaktionen</h3>
                </div>
                <div class="card-body">
                    <div class="quick-actions">
                        <a href="/admin/pages/vehicles.php?action=add" class="action-btn">
                            <i class="fas fa-plus-circle"></i>
                            <span>Neues Fahrzeug</span>
                        </a>
                        <a href="/admin/pages/inspections.php?action=add" class="action-btn">
                            <i class="fas fa-clipboard-check"></i>
                            <span>Neue Inspektion</span>
                        </a>
                        <a href="/admin/pages/users.php?action=add" class="action-btn">
                            <i class="fas fa-user-plus"></i>
                            <span>Neuer Benutzer</span>
                        </a>
                        <a href="/admin/pages/settings.php" class="action-btn">
                            <i class="fas fa-cog"></i>
                            <span>Einstellungen</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </main>
    
    <script src="/admin/assets/js/admin.js"></script>
    <script>
        // Load dashboard data
        document.addEventListener('DOMContentLoaded', async function() {
            try {
                // Load vehicles
                const vehiclesRes = await fetch('/api/vehicles.php');
                const vehicles = await vehiclesRes.json();
                document.getElementById('totalVehicles').textContent = vehicles.data?.length || 0;
                
                // Load inspections
                const inspectionsRes = await fetch('/api/inspections.php');
                const inspections = await inspectionsRes.json();
                document.getElementById('totalInspections').textContent = inspections.data?.length || 0;
                
                // Count problematic
                const problematic = inspections.data?.filter(i => i.overallRating === 'Inakzeptabel').length || 0;
                document.getElementById('problematic').textContent = problematic;
                
                // Display recent inspections
                const recentInspections = inspections.data?.slice(0, 5) || [];
                const inspectionsHTML = recentInspections.map(i => `
                    <div class="list-item">
                        <div class="item-main">
                            <strong>${i.licensePlate}</strong>
                            <span class="badge badge-${getRatingClass(i.overallRating)}">${i.overallRating}</span>
                        </div>
                        <small>${i.type} - ${i.inspector}</small>
                    </div>
                `).join('') || '<p class="no-data">Keine Inspektionen</p>';
                document.getElementById('recentInspections').innerHTML = inspectionsHTML;
                
                // Display available vehicles
                const availableVehicles = vehicles.data?.filter(v => v.status === 'Verfügbar').slice(0, 5) || [];
                const vehiclesHTML = availableVehicles.map(v => `
                    <div class="list-item">
                        <div class="item-main">
                            <strong>${v.brand} ${v.model}</strong>
                            <span class="badge badge-success">${v.status}</span>
                        </div>
                        <small>${v.licensePlate} - ${v.mileage?.toLocaleString('de-DE')} km</small>
                    </div>
                `).join('') || '<p class="no-data">Keine verfügbaren Fahrzeuge</p>';
                document.getElementById('availableVehicles').innerHTML = vehiclesHTML;
                
            } catch (error) {
                console.error('Error loading dashboard data:', error);
            }
        });
        
        function getRatingClass(rating) {
            switch(rating) {
                case 'Akzeptabel': return 'success';
                case 'Reinigung erforderlich': return 'warning';
                case 'Inakzeptabel': return 'danger';
                default: return 'info';
            }
        }
    </script>
</body>
</html>
