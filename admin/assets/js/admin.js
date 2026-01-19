// Admin JavaScript Utilities

// API Helper
const AdminAPI = {
    baseUrl: '/api',
    
    async request(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },
    
    async get(endpoint) {
        return this.request(endpoint);
    },
    
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },
    
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },
    
    async delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE'
        });
    }
};

// Modal Helper
class Modal {
    constructor(id) {
        this.modal = document.getElementById(id);
        if (!this.modal) {
            console.error(`Modal with id "${id}" not found`);
            return;
        }
        
        // Close on backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }
    
    open() {
        if (this.modal) {
            this.modal.classList.add('active');
        }
    }
    
    close() {
        if (this.modal) {
            this.modal.classList.remove('active');
        }
    }
}

// Alert Helper
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
        <i class="fas fa-${getAlertIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // Insert at top of admin content
    const content = document.querySelector('.admin-content');
    if (content) {
        content.insertBefore(alertDiv, content.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            alertDiv.style.transition = 'all 0.3s';
            alertDiv.style.opacity = '0';
            setTimeout(() => alertDiv.remove(), 300);
        }, 5000);
    }
}

function getAlertIcon(type) {
    const icons = {
        success: 'check-circle',
        danger: 'times-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Confirm Dialog
function confirmAction(message) {
    return new Promise((resolve) => {
        const confirmed = confirm(message);
        resolve(confirmed);
    });
}

// Format Date
function formatDate(dateString) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('de-DE', options);
}

// Format Number
function formatNumber(number) {
    return new Intl.NumberFormat('de-DE').format(number);
}

// Status Badge Helper
function getStatusBadge(status) {
    const statusMap = {
        'Verfügbar': 'success',
        'Verliehen': 'warning',
        'In Wartung': 'danger',
        'Akzeptabel': 'success',
        'Reinigung erforderlich': 'warning',
        'Inakzeptabel': 'danger'
    };
    
    const badgeClass = statusMap[status] || 'info';
    return `<span class="badge badge-${badgeClass}">${status}</span>`;
}

// Form Validation
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'var(--admin-danger)';
            isValid = false;
        } else {
            input.style.borderColor = '#e5e7eb';
        }
    });
    
    return isValid;
}

// Loading State
function setLoading(element, isLoading) {
    if (isLoading) {
        element.disabled = true;
        element.dataset.originalText = element.innerHTML;
        element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Lädt...';
    } else {
        element.disabled = false;
        element.innerHTML = element.dataset.originalText;
    }
}

// Debounce Helper
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for use in other files
window.AdminAPI = AdminAPI;
window.Modal = Modal;
window.showAlert = showAlert;
window.confirmAction = confirmAction;
window.formatDate = formatDate;
window.formatNumber = formatNumber;
window.getStatusBadge = getStatusBadge;
window.validateForm = validateForm;
window.setLoading = setLoading;
window.debounce = debounce;
