// API Base URL
const API_BASE = window.location.origin + '/api';

// API Client
const api = {
    // Vehicles
    async getVehicles(params = {}) {
        const query = new URLSearchParams(params).toString();
        const url = `${API_BASE}/vehicles.php${query ? '?' + query : ''}`;
        const response = await fetch(url);
        return await response.json();
    },

    async getVehicle(id) {
        const response = await fetch(`${API_BASE}/vehicles.php?id=${id}`);
        return await response.json();
    },

    // Inspections
    async getInspections(params = {}) {
        const query = new URLSearchParams(params).toString();
        const url = `${API_BASE}/inspections.php${query ? '?' + query : ''}`;
        const response = await fetch(url);
        return await response.json();
    },

    async getInspectionStats() {
        const response = await fetch(`${API_BASE}/inspections.php?action=stats`);
        return await response.json();
    },

    // Standards
    async getStandards(params = {}) {
        const query = new URLSearchParams(params).toString();
        const url = `${API_BASE}/standards.php${query ? '?' + query : ''}`;
        const response = await fetch(url);
        return await response.json();
    }
};
