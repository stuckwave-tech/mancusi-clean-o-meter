// Router and App Logic
class App {
    constructor() {
        this.currentPage = 'dashboard';
        this.init();
    }

    init() {
        // Setup navigation
        this.setupNavigation();
        
        // Load initial page
        this.loadPage('dashboard');
        
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            const page = e.state?.page || 'dashboard';
            this.loadPage(page, false);
        });
    }

    setupNavigation() {
        const menuToggle = document.getElementById('menuToggle');
        const nav = document.getElementById('mainNav');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.loadPage(page);
                
                // Close mobile menu
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                    menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                }
            });
        });
    }

    loadPage(page, pushState = true) {
        this.currentPage = page;
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.page === page);
        });
        
        // Update browser history
        if (pushState) {
            history.pushState({ page }, '', page === 'dashboard' ? '/' : `#${page}`);
        }
        
        // Load page content
        const content = document.getElementById('content');
        content.classList.remove('fade-in');
        
        setTimeout(() => {
            switch (page) {
                case 'dashboard':
                    this.renderDashboard();
                    break;
                case 'vehicles':
                    this.renderVehicles();
                    break;
                case 'inspections':
                    this.renderInspections();
                    break;
                case 'standards':
                    this.renderStandards();
                    break;
                default:
                    this.render404();
            }
            content.classList.add('fade-in');
        }, 100);
    }

    async renderDashboard() {
        const content = document.getElementById('content');
        content.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Lädt...</div>';

        try {
            const [vehicles, inspections, stats] = await Promise.all([
                api.getVehicles(),
                api.getInspections(),
                api.getInspectionStats()
            ]);

            const vehicleCount = vehicles.data?.length || 0;
            const inspectionCount = inspections.data?.length || 0;
            const problematic = inspections.data?.filter(i => i.overallRating === 'Inakzeptabel').length || 0;
            const acceptable = stats.data?.byRating?.akzeptabel || 0;

            content.innerHTML = `
                <div class="page-header">
                    <h1>Dashboard</h1>
                    <p class="subtitle">Übersicht über das Qualitätsmanagement-System</p>
                </div>

                <div class="grid grid-4" style="margin-bottom: 2rem;">
                    <div class="card">
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #001e50, #0066cc); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.75rem;">
                                <i class="fas fa-car"></i>
                            </div>
                            <div>
                                <h3 style="margin: 0;">${vehicleCount}</h3>
                                <p style="margin: 0; color: var(--text-secondary);">Fahrzeuge</p>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #17a2b8, #0d8ca8); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.75rem;">
                                <i class="fas fa-clipboard-check"></i>
                            </div>
                            <div>
                                <h3 style="margin: 0;">${inspectionCount}</h3>
                                <p style="margin: 0; color: var(--text-secondary);">Inspektionen</p>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #dc3545, #c82333); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.75rem;">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                            <div>
                                <h3 style="margin: 0;">${problematic}</h3>
                                <p style="margin: 0; color: var(--text-secondary);">Problematisch</p>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #28a745, #218838); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.75rem;">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div>
                                <h3 style="margin: 0;">${acceptable}</h3>
                                <p style="margin: 0; color: var(--text-secondary);">Akzeptabel</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-2">
                    <div class="card">
                        <h2>Qualitätsanspruch</h2>
                        <p>Unser Sauberkeits-Standard für Vorführwagen und Leihfahrzeuge.</p>
                        <img src="/public/assets/images/qualitaetsanspruch.jpg" alt="Qualitätsanspruch" style="width: 100%; border-radius: 8px; margin: 1rem 0; box-shadow: var(--shadow);">
                        <a href="#standards" class="btn btn-primary" onclick="event.preventDefault(); app.loadPage('standards');">
                            Standards ansehen
                        </a>
                    </div>

                    <div class="card">
                        <h2>Wichtige Hinweise</h2>
                        <div style="display: grid; gap: 1rem; margin-top: 1rem;">
                            <div style="padding: 1rem; background-color: var(--bg-secondary); border-radius: 8px; border-left: 4px solid var(--secondary-color);">
                                <strong style="display: block; margin-bottom: 0.5rem; color: var(--primary-color);">Innenraum reinigen:</strong>
                                <p style="margin: 0; color: var(--text-secondary);">Vor der Rückgabe Müll entfernen und grobe Verschmutzungen beseitigen.</p>
                            </div>
                            <div style="padding: 1rem; background-color: var(--bg-secondary); border-radius: 8px; border-left: 4px solid var(--secondary-color);">
                                <strong style="display: block; margin-bottom: 0.5rem; color: var(--primary-color);">Äußeres prüfen:</strong>
                                <p style="margin: 0; color: var(--text-secondary);">Das Fahrzeug muss stets einen ordentlichen und vorzeigbaren Eindruck machen.</p>
                            </div>
                            <div style="padding: 1rem; background-color: var(--bg-secondary); border-radius: 8px; border-left: 4px solid var(--secondary-color);">
                                <strong style="display: block; margin-bottom: 0.5rem; color: var(--primary-color);">Für alle gültig:</strong>
                                <p style="margin: 0; color: var(--text-secondary);">Dies gilt für Kunden, Mitarbeiter und interne Fahrten.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            content.innerHTML = `<div class="error">Fehler beim Laden: ${error.message}</div>`;
        }
    }

    async renderVehicles() {
        const content = document.getElementById('content');
        content.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Lädt Fahrzeuge...</div>';

        try {
            const result = await api.getVehicles();
            const vehicles = result.data || [];

            let html = `
                <div class="page-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <h1>Fahrzeugverwaltung</h1>
                </div>
            `;

            if (vehicles.length === 0) {
                html += `
                    <div class="card" style="text-align: center; padding: 3rem;">
                        <i class="fas fa-car" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                        <p style="color: var(--text-secondary);">Keine Fahrzeuge gefunden</p>
                    </div>
                `;
            } else {
                html += '<div class="grid grid-3">';
                vehicles.forEach(vehicle => {
                    const statusClass = this.getStatusClass(vehicle.status);
                    html += `
                        <div class="card">
                            ${vehicle.images && vehicle.images.length > 0 ? `
                                <img src="${vehicle.images[0]}" alt="${vehicle.brand} ${vehicle.model}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                            ` : ''}
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                                <h3 style="margin: 0;">${vehicle.brand} ${vehicle.model}</h3>
                                <span class="badge badge-${statusClass}">${vehicle.status}</span>
                            </div>
                            <div style="display: grid; gap: 0.5rem; margin-bottom: 1rem;">
                                <div style="display: flex; justify-content: space-between;">
                                    <span style="color: var(--text-secondary); font-size: 0.875rem;">Kennzeichen:</span>
                                    <strong style="font-family: monospace; color: var(--primary-color);">${vehicle.licensePlate}</strong>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                    <span style="color: var(--text-secondary); font-size: 0.875rem;">Typ:</span>
                                    <strong>${vehicle.type}</strong>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                    <span style="color: var(--text-secondary); font-size: 0.875rem;">Jahr:</span>
                                    <strong>${vehicle.year}</strong>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                    <span style="color: var(--text-secondary); font-size: 0.875rem;">Km-Stand:</span>
                                    <strong>${vehicle.mileage?.toLocaleString('de-DE')} km</strong>
                                </div>
                            </div>
                        </div>
                    `;
                });
                html += '</div>';
            }

            content.innerHTML = html;
        } catch (error) {
            content.innerHTML = `<div class="error">Fehler beim Laden der Fahrzeuge: ${error.message}</div>`;
        }
    }

    async renderInspections() {
        const content = document.getElementById('content');
        content.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Lädt Inspektionen...</div>';

        try {
            const result = await api.getInspections();
            const inspections = result.data || [];

            let html = `
                <div class="page-header">
                    <h1>Inspektionen</h1>
                </div>
            `;

            if (inspections.length === 0) {
                html += `
                    <div class="card" style="text-align: center; padding: 3rem;">
                        <i class="fas fa-clipboard-check" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                        <p style="color: var(--text-secondary);">Keine Inspektionen gefunden</p>
                    </div>
                `;
            } else {
                inspections.forEach(inspection => {
                    const ratingClass = this.getRatingClass(inspection.overallRating);
                    const statusClass = this.getStatusClass(inspection.status);
                    
                    html += `
                        <div class="card">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                                <div>
                                    <h3 style="margin: 0 0 0.5rem 0; font-family: monospace;">${inspection.licensePlate}</h3>
                                    <div style="display: flex; gap: 1rem; font-size: 0.875rem; color: var(--text-secondary);">
                                        <span>Inspektor: <strong>${inspection.inspector}</strong></span>
                                        <span>Typ: <strong>${inspection.type}</strong></span>
                                        <span>Datum: <strong>${new Date(inspection.date).toLocaleDateString('de-DE')}</strong></span>
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-end;">
                                    <span class="badge badge-${ratingClass}">${inspection.overallRating}</span>
                                    <span class="badge badge-${statusClass}">${inspection.status}</span>
                                </div>
                            </div>
                            
                            ${inspection.notes ? `
                                <p style="padding: 1rem; background-color: var(--bg-secondary); border-radius: 8px; margin-bottom: 1rem; font-style: italic;">
                                    ${inspection.notes}
                                </p>
                            ` : ''}
                            
                            ${inspection.actionRequired && (inspection.actionRequired.cleaning || inspection.actionRequired.repair || inspection.actionRequired.detailing) ? `
                                <div style="padding: 1rem; background-color: var(--bg-secondary); border-radius: 8px;">
                                    <strong style="display: block; margin-bottom: 0.5rem;">Erforderliche Maßnahmen:</strong>
                                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                                        ${inspection.actionRequired.cleaning ? '<span class="badge badge-warning">Reinigung</span>' : ''}
                                        ${inspection.actionRequired.repair ? '<span class="badge badge-warning">Reparatur</span>' : ''}
                                        ${inspection.actionRequired.detailing ? '<span class="badge badge-warning">Aufbereitung</span>' : ''}
                                    </div>
                                    ${inspection.estimatedCost ? `
                                        <p style="margin-top: 0.5rem; color: var(--text-secondary);">
                                            Geschätzte Kosten: <strong style="color: var(--danger-color);">${inspection.estimatedCost}€</strong>
                                        </p>
                                    ` : ''}
                                </div>
                            ` : ''}
                        </div>
                    `;
                });
            }

            content.innerHTML = html;
        } catch (error) {
            content.innerHTML = `<div class="error">Fehler beim Laden der Inspektionen: ${error.message}</div>`;
        }
    }

    async renderStandards() {
        const content = document.getElementById('content');
        content.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Lädt Standards...</div>';

        try {
            const result = await api.getStandards();
            const standards = result.data || [];

            let html = `
                <div class="page-header">
                    <h1>Qualitätsstandards</h1>
                    <p class="subtitle">Unser Qualitätsanspruch: Rückgabe von Vorführwagen</p>
                </div>

                <div class="grid grid-2" style="margin-bottom: 2rem;">
                    <div style="background: linear-gradient(135deg, #001e50, #0066cc); color: white; padding: 2rem; border-radius: 8px; box-shadow: var(--shadow-lg);">
                        <h2 style="color: white; margin-bottom: 1rem;">Das Problem: Inakzeptabler Zustand</h2>
                        <p style="margin: 0;">Vorführwagen werden stark verschmutzt zurückgegeben. Der aktuelle Zustand der Fahrzeuge ist nicht repräsentativ und inakzeptabel.</p>
                    </div>
                    <div style="background: linear-gradient(135deg, #001e50, #0066cc); color: white; padding: 2rem; border-radius: 8px; box-shadow: var(--shadow-lg);">
                        <h2 style="color: white; margin-bottom: 1rem;">Die Lösung: Unser Sauberkeits-Standard</h2>
                        <p style="margin: 0;">Jedes Fahrzeug muss sauber zurückgegeben werden. Dies gilt für alle: Kunden, Mitarbeiter und interne Fahrten.</p>
                    </div>
                </div>

                <div style="margin-bottom: 2rem;">
                    <img src="/public/assets/images/qualitaetsanspruch.jpg" alt="Qualitätsanspruch" style="width: 100%; border-radius: 8px; box-shadow: var(--shadow-lg);">
                </div>
            `;

            standards.forEach(standard => {
                html += `
                    <div class="card" style="border-left: 4px solid var(--secondary-color);">
                        <div style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1.5rem;">
                            <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #001e50, #0066cc); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">
                                <i class="fas fa-star"></i>
                            </div>
                            <div>
                                <span style="display: inline-block; padding: 0.25rem 0.75rem; background-color: var(--bg-secondary); color: var(--text-secondary); border-radius: 4px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; margin-bottom: 0.5rem;">
                                    ${standard.category}
                                </span>
                                <h3 style="margin: 0;">${standard.title}</h3>
                            </div>
                        </div>
                        
                        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${standard.description}</p>
                        
                        <h4 style="font-size: 1rem; margin-bottom: 1rem;">Anforderungen:</h4>
                        <div style="display: grid; gap: 0.5rem;">
                            ${standard.requirements.map(req => `
                                <div style="display: flex; align-items: start; gap: 0.75rem; padding: 0.75rem; background-color: var(--bg-secondary); border-radius: 8px; border-left: 3px solid ${this.getLevelColor(req.level)};">
                                    <i class="fas fa-check-circle" style="color: var(--success-color); font-size: 1.2rem; flex-shrink: 0; margin-top: 0.1rem;"></i>
                                    <div style="flex: 1;">
                                        <span>${req.item}</span>
                                        <span style="padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; margin-left: 0.5rem; ${this.getLevelStyle(req.level)}">
                                            ${req.level}
                                        </span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            });

            html += `
                <div class="card" style="background: linear-gradient(to right, #fff5e6, #ffffff); border-left: 4px solid var(--accent-color);">
                    <h2>Dokumentation</h2>
                    <p>Laden Sie unsere vollständigen Qualitätsstandards und Strategien herunter:</p>
                    <div style="display: flex; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap;">
                        <a href="/public/assets/pdfs/praesentation.pdf" class="btn btn-primary" download>
                            <i class="fas fa-download"></i> Präsentation herunterladen
                        </a>
                        <a href="/public/assets/pdfs/strategien.pdf" class="btn btn-secondary" download>
                            <i class="fas fa-download"></i> Strategien herunterladen
                        </a>
                    </div>
                </div>
            `;

            content.innerHTML = html;
        } catch (error) {
            content.innerHTML = `<div class="error">Fehler beim Laden der Standards: ${error.message}</div>`;
        }
    }

    render404() {
        const content = document.getElementById('content');
        content.innerHTML = `
            <div style="text-align: center; padding: 4rem 2rem;">
                <h1 style="font-size: 6rem; margin-bottom: 0;">404</h1>
                <h2 style="color: var(--text-secondary); margin-bottom: 1rem;">Seite nicht gefunden</h2>
                <p style="color: var(--text-secondary); margin-bottom: 2rem;">Die angeforderte Seite existiert nicht.</p>
                <a href="/" class="btn btn-primary" onclick="event.preventDefault(); app.loadPage('dashboard');">
                    <i class="fas fa-home"></i> Zurück zum Dashboard
                </a>
            </div>
        `;
    }

    getStatusClass(status) {
        const map = {
            'Verfügbar': 'success',
            'Verliehen': 'warning',
            'In Inspektion': 'info',
            'In Reinigung': 'info',
            'Nicht Verfügbar': 'danger',
            'Offen': 'info',
            'In Bearbeitung': 'warning',
            'Abgeschlossen': 'success'
        };
        return map[status] || 'info';
    }

    getRatingClass(rating) {
        const map = {
            'Akzeptabel': 'success',
            'Reinigung erforderlich': 'warning',
            'Inakzeptabel': 'danger'
        };
        return map[rating] || 'info';
    }

    getLevelColor(level) {
        const map = {
            'Muss': '#dc3545',
            'Sollte': '#ffc107',
            'Optional': '#17a2b8'
        };
        return map[level] || '#17a2b8';
    }

    getLevelStyle(level) {
        const styles = {
            'Muss': 'background-color: #dc3545; color: white;',
            'Sollte': 'background-color: #ffc107; color: #212529;',
            'Optional': 'background-color: #17a2b8; color: white;'
        };
        return styles[level] || styles['Optional'];
    }
}

// Initialize app
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new App();
});
