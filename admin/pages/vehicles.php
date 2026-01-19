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
    <title>Fahrzeugverwaltung - Admin</title>
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
            <a href="/admin/index.php" class="nav-link">
                <i class="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </a>
            <a href="/admin/pages/vehicles.php" class="nav-link active">
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
            <h1>Fahrzeugverwaltung</h1>
            <div class="header-actions">
                <button class="btn btn-primary" onclick="openAddModal()">
                    <i class="fas fa-plus"></i>
                    Neues Fahrzeug
                </button>
            </div>
        </header>
        
        <div class="admin-content">
            <!-- Search & Filter -->
            <div class="card" style="margin-bottom: 20px;">
                <div class="card-body">
                    <div class="form-row">
                        <div class="form-group">
                            <input 
                                type="text" 
                                id="searchInput" 
                                placeholder="Suche nach Kennzeichen, Marke, Modell..." 
                                onkeyup="filterVehicles()"
                            >
                        </div>
                        <div class="form-group">
                            <select id="statusFilter" onchange="filterVehicles()">
                                <option value="">Alle Status</option>
                                <option value="Verfügbar">Verfügbar</option>
                                <option value="Verliehen">Verliehen</option>
                                <option value="In Wartung">In Wartung</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Vehicles Table -->
            <div class="card">
                <div class="card-body">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Kennzeichen</th>
                                <th>Marke & Modell</th>
                                <th>FIN</th>
                                <th>Baujahr</th>
                                <th>Farbe</th>
                                <th>Kilometerstand</th>
                                <th>Status</th>
                                <th>Aktionen</th>
                            </tr>
                        </thead>
                        <tbody id="vehiclesTableBody">
                            <tr>
                                <td colspan="8" class="loading">Lädt Fahrzeuge...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
    
    <!-- Add/Edit Modal -->
    <div id="vehicleModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modalTitle">Neues Fahrzeug</h2>
                <button class="modal-close" onclick="closeVehicleModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="vehicleForm">
                    <input type="hidden" id="vehicleId">
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="licensePlate">Kennzeichen *</label>
                            <input type="text" id="licensePlate" required>
                        </div>
                        <div class="form-group">
                            <label for="type">Fahrzeugtyp *</label>
                            <select id="type" required>
                                <option value="Vorführwagen">Vorführwagen</option>
                                <option value="Leihfahrzeug">Leihfahrzeug</option>
                                <option value="Intern">Intern</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="brand">Marke *</label>
                            <input type="text" id="brand" required>
                        </div>
                        <div class="form-group">
                            <label for="model">Modell *</label>
                            <input type="text" id="model" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="vin">FIN/VIN *</label>
                            <input type="text" id="vin" required maxlength="17">
                        </div>
                        <div class="form-group">
                            <label for="year">Baujahr *</label>
                            <input type="number" id="year" required min="1990" max="2030">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="color">Farbe *</label>
                            <input type="text" id="color" required>
                        </div>
                        <div class="form-group">
                            <label for="mileage">Kilometerstand *</label>
                            <input type="number" id="mileage" required min="0">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="status">Status *</label>
                            <select id="status" required>
                                <option value="Verfügbar">Verfügbar</option>
                                <option value="Verliehen">Verliehen</option>
                                <option value="In Wartung">In Wartung</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeVehicleModal()">Abbrechen</button>
                <button class="btn btn-primary" id="saveVehicleBtn" onclick="saveVehicle()">
                    <i class="fas fa-save"></i>
                    Speichern
                </button>
            </div>
        </div>
    </div>
    
    <script src="/admin/assets/js/admin.js"></script>
    <script>
        let vehicles = [];
        const modal = new Modal('vehicleModal');
        
        // Load vehicles on page load
        document.addEventListener('DOMContentLoaded', loadVehicles);
        
        async function loadVehicles() {
            try {
                const response = await AdminAPI.get('/vehicles.php');
                vehicles = response.data || [];
                displayVehicles(vehicles);
            } catch (error) {
                showAlert('Fehler beim Laden der Fahrzeuge', 'danger');
            }
        }
        
        function displayVehicles(vehiclesToDisplay) {
            const tbody = document.getElementById('vehiclesTableBody');
            
            if (vehiclesToDisplay.length === 0) {
                tbody.innerHTML = '<tr><td colspan="8" class="no-data">Keine Fahrzeuge gefunden</td></tr>';
                return;
            }
            
            tbody.innerHTML = vehiclesToDisplay.map(vehicle => `
                <tr>
                    <td><strong>${vehicle.licensePlate}</strong></td>
                    <td>${vehicle.brand} ${vehicle.model}</td>
                    <td><code>${vehicle.vin}</code></td>
                    <td>${vehicle.year}</td>
                    <td>${vehicle.color}</td>
                    <td>${formatNumber(vehicle.mileage)} km</td>
                    <td>${getStatusBadge(vehicle.status)}</td>
                    <td class="table-actions">
                        <button class="btn btn-sm btn-secondary" onclick="editVehicle(${vehicle.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteVehicle(${vehicle.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
        }
        
        function filterVehicles() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const statusFilter = document.getElementById('statusFilter').value;
            
            let filtered = vehicles;
            
            if (searchTerm) {
                filtered = filtered.filter(v => 
                    v.licensePlate.toLowerCase().includes(searchTerm) ||
                    v.brand.toLowerCase().includes(searchTerm) ||
                    v.model.toLowerCase().includes(searchTerm) ||
                    v.vin.toLowerCase().includes(searchTerm)
                );
            }
            
            if (statusFilter) {
                filtered = filtered.filter(v => v.status === statusFilter);
            }
            
            displayVehicles(filtered);
        }
        
        function openAddModal() {
            document.getElementById('modalTitle').textContent = 'Neues Fahrzeug';
            document.getElementById('vehicleForm').reset();
            document.getElementById('vehicleId').value = '';
            modal.open();
        }
        
        function closeVehicleModal() {
            modal.close();
        }
        
        function editVehicle(id) {
            const vehicle = vehicles.find(v => v.id === id);
            if (!vehicle) return;
            
            document.getElementById('modalTitle').textContent = 'Fahrzeug bearbeiten';
            document.getElementById('vehicleId').value = vehicle.id;
            document.getElementById('licensePlate').value = vehicle.licensePlate;
            document.getElementById('type').value = vehicle.type;
            document.getElementById('brand').value = vehicle.brand;
            document.getElementById('model').value = vehicle.model;
            document.getElementById('vin').value = vehicle.vin;
            document.getElementById('year').value = vehicle.year;
            document.getElementById('color').value = vehicle.color;
            document.getElementById('mileage').value = vehicle.mileage;
            document.getElementById('status').value = vehicle.status;
            
            modal.open();
        }
        
        async function saveVehicle() {
            const form = document.getElementById('vehicleForm');
            
            if (!validateForm(form)) {
                showAlert('Bitte fülle alle Pflichtfelder aus', 'warning');
                return;
            }
            
            const vehicleId = document.getElementById('vehicleId').value;
            const vehicleData = {
                id: vehicleId ? parseInt(vehicleId) : Date.now(),
                licensePlate: document.getElementById('licensePlate').value,
                type: document.getElementById('type').value,
                brand: document.getElementById('brand').value,
                model: document.getElementById('model').value,
                vin: document.getElementById('vin').value,
                year: parseInt(document.getElementById('year').value),
                color: document.getElementById('color').value,
                mileage: parseInt(document.getElementById('mileage').value),
                status: document.getElementById('status').value,
                images: []
            };
            
            const saveBtn = document.getElementById('saveVehicleBtn');
            setLoading(saveBtn, true);
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));
                
                if (vehicleId) {
                    // Update existing
                    const index = vehicles.findIndex(v => v.id == vehicleId);
                    vehicles[index] = vehicleData;
                    showAlert('Fahrzeug erfolgreich aktualisiert', 'success');
                } else {
                    // Add new
                    vehicles.push(vehicleData);
                    showAlert('Fahrzeug erfolgreich hinzugefügt', 'success');
                }
                
                displayVehicles(vehicles);
                closeVehicleModal();
            } catch (error) {
                showAlert('Fehler beim Speichern', 'danger');
            } finally {
                setLoading(saveBtn, false);
            }
        }
        
        async function deleteVehicle(id) {
            const confirmed = await confirmAction('Möchtest du dieses Fahrzeug wirklich löschen?');
            if (!confirmed) return;
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));
                
                vehicles = vehicles.filter(v => v.id !== id);
                displayVehicles(vehicles);
                showAlert('Fahrzeug erfolgreich gelöscht', 'success');
            } catch (error) {
                showAlert('Fehler beim Löschen', 'danger');
            }
        }
    </script>
</body>
</html>
