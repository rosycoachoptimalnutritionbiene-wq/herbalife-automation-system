// ============================================
// SYSTÈME D'AUTOMATISATION HERBALIFE
// Application JavaScript
// ============================================

// ========== STATE MANAGEMENT ==========
const app = {
    currentSection: 'dashboard',
    supervisors: [
        { id: 1, name: 'Marie Dupont', email: 'marie@herbalife.com', status: 'actif', role: 'Principal', sales_day: 500, sales_total: 3500, team_size: 0 },
        { id: 2, name: 'Jean Martin', email: 'jean@herbalife.com', status: 'actif', role: 'Secondaire', sales_day: 320, sales_total: 4500, team_size: 2 },
        { id: 3, name: 'Sophie Bernard', email: 'sophie@herbalife.com', status: 'actif', role: 'Secondaire', sales_day: 450, sales_total: 5800, team_size: 1 },
        { id: 4, name: 'Pierre Leclerc', email: 'pierre@herbalife.com', status: 'actif', role: 'Secondaire', sales_day: 600, sales_total: 6200, team_size: 3 },
        { id: 5, name: 'Isabelle Fontaine', email: 'isabelle@herbalife.com', status: 'actif', role: 'Secondaire', sales_day: 200, sales_total: 3500, team_size: 0 },
        { id: 6, name: 'Thomas Henry', email: 'thomas@herbalife.com', status: 'inactif', role: 'Secondaire', sales_day: 0, sales_total: 2000, team_size: 0 },
        { id: 7, name: 'Nathalie Girard', email: 'nathalie@herbalife.com', status: 'inactif', role: 'Secondaire', sales_day: 0, sales_total: 1800, team_size: 0 },
        { id: 8, name: 'Michel Rousseau', email: 'michel@herbalife.com', status: 'inactif', role: 'Secondaire', sales_day: 0, sales_total: 1500, team_size: 0 }
    ],
    sales: [
        { date: '2025-04-30 14:30', seller: 'Marie Dupont', product: 'Pack Nutrition', amount: 500, status: 'Validée' },
        { date: '2025-04-30 13:15', seller: 'Jean Martin', product: 'Complément Alimentaire', amount: 320, status: 'Validée' },
        { date: '2025-04-30 12:00', seller: 'Sophie Bernard', product: 'Produit Beauté', amount: 450, status: 'Validée' }
    ],
    notifications: [
        { type: 'success', title: 'Vente Enregistrée', message: 'Vente de 500€ enregistrée avec succès par Marie Dupont.', time: 'Il y a 30 minutes' },
        { type: 'info', title: 'Routine Exécutée', message: 'La routine de vérification d\'activité a été exécutée. 4 superviseurs actifs détectés.', time: 'Il y a 2 heures' }
    ]
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Application chargée');
    updateDashboard();
    updateNotificationBadge();
});

// ========== NAVIGATION ==========
function showSection(sectionId) {
    // Masquer toutes les sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Masquer tous les boutons du menu
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Afficher la section sélectionnée
    document.getElementById(sectionId).classList.add('active');

    // Activer le bouton du menu
    event.target.classList.add('active');

    // Mettre à jour le titre
    const titles = {
        'dashboard': { title: 'Dashboard', subtitle: 'Vue d\'ensemble de votre activité' },
        'team': { title: 'Mon Équipe', subtitle: 'Gestion des distributeurs' },
        'supervisors': { title: 'Superviseurs', subtitle: 'Gestion des superviseurs actifs et inactifs' },
        'sales': { title: 'Ventes', subtitle: 'Enregistrement et suivi des ventes' },
        'routines': { title: 'Routines Automatiques', subtitle: 'Gestion des tâches quotidiennes' },
        'reports': { title: 'Rapports', subtitle: 'Statistiques et analyses' },
        'notifications': { title: 'Notifications', subtitle: 'Centre de notifications' },
        'settings': { title: 'Paramètres', subtitle: 'Configuration du compte' }
    };

    const config = titles[sectionId] || { title: 'Section', subtitle: 'Détails' };
    document.getElementById('section-title').textContent = config.title;
    document.getElementById('section-subtitle').textContent = config.subtitle;

    app.currentSection = sectionId;
}

// ========== DASHBOARD UPDATES ==========
function updateDashboard() {
    // Calculer les totaux
    const totalSalesToday = app.sales.reduce((sum, sale) => sum + sale.amount, 0);
    const activeSupervisors = app.supervisors.filter(s => s.status === 'actif').length;
    const totalSalesMonth = 23500; // Exemple

    // Mettre à jour les éléments
    document.getElementById('sales-today').textContent = totalSalesToday + '€';
    document.getElementById('sales-month').textContent = totalSalesMonth + '€';
    document.getElementById('active-supervisors').textContent = activeSupervisors;
    document.getElementById('performance').textContent = '85%';
    document.getElementById('total-sales-today').textContent = totalSalesToday + '€';
}

// ========== NOTIFICATIONS ==========
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️'
    };

    toast.innerHTML = `
        <span>${icons[type] || '✅'}</span>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function updateNotificationBadge() {
    document.getElementById('notifications-badge').textContent = `🔔 ${app.notifications.length}`;
}

function addNotification(type, title, message) {
    const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    app.notifications.push({
        type: type,
        title: title,
        message: message,
        time: 'À l\'instant'
    });
    updateNotificationBadge();
}

// ========== SALES MANAGEMENT ==========
function recordSale(event) {
    event.preventDefault();
    
    const form = event.target;
    const seller = form.querySelector('select').value;
    const amount = parseInt(form.querySelectorAll('input')[0].value);
    const product = form.querySelectorAll('select')[1].value;
    const description = form.querySelector('textarea').value;

    const date = new Date().toLocaleString('fr-FR');
    app.sales.push({
        date: date,
        seller: seller,
        product: product,
        amount: amount,
        status: 'Validée'
    });

    // Mettre à jour les ventes du superviseur
    const supervisor = app.supervisors.find(s => s.name === seller);
    if (supervisor) {
        supervisor.sales_day += amount;
        supervisor.sales_total += amount;
    }

    showToast(`✅ Vente de ${amount}€ enregistrée avec succès!`, 'success');
    form.reset();
    updateDashboard();
    addNotification('success', 'Vente Enregistrée', `Vente de ${amount}€ enregistrée par ${seller}`);
}

// ========== SUPERVISORS MANAGEMENT ==========
function reactivateSupervisor(name) {
    const supervisor = app.supervisors.find(s => s.name === name);
    if (supervisor) {
        supervisor.status = 'actif';
        showToast(`✅ ${name} a été réactivé!`, 'success');
        addNotification('success', 'Superviseur Réactivé', `${name} est maintenant actif`);
        location.reload();
    }
}

function addSupervisor() {
    document.getElementById('addSupervisorModal').classList.add('active');
}

function submitAddSupervisor(event) {
    if (event) event.preventDefault();
    
    const form = document.querySelector('#addSupervisorModal form');
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const status = form.querySelector('select').value;

    const newId = Math.max(...app.supervisors.map(s => s.id)) + 1;
    app.supervisors.push({
        id: newId,
        name: name,
        email: email,
        status: status,
        role: 'Secondaire',
        sales_day: 0,
        sales_total: 0,
        team_size: 0
    });

    showToast(`✅ ${name} a été ajouté!`, 'success');
    closeModal('addSupervisorModal');
    addNotification('success', 'Superviseur Ajouté', `${name} a été ajouté à l'équipe`);
    location.reload();
}

// ========== ROUTINES EXECUTION ==========
function executeRoutine(routineId) {
    const routines = {
        'verify-activity': {
            name: 'Vérification d\'activité',
            execute: () => {
                const active = app.supervisors.filter(s => s.status === 'actif').length;
                const inactive = app.supervisors.filter(s => s.status === 'inactif').length;
                const log = `✅ Vérification d'activité exécutée - ${active} actifs, ${inactive} inactifs`;
                addExecutionLog(log);
                addNotification('info', 'Routine Exécutée', `Vérification d'activité: ${active} superviseurs actifs`);
                showToast(log, 'success');
            }
        },
        'sales-report': {
            name: 'Rapport de ventes',
            execute: () => {
                const total = app.sales.reduce((sum, s) => sum + s.amount, 0);
                const log = `💰 Rapport de ventes généré - Total: ${total}€`;
                addExecutionLog(log);
                addNotification('success', 'Rapport Généré', `Rapport de ventes: ${total}€`);
                showToast(log, 'success');
            }
        },
        'send-reminders': {
            name: 'Rappels de tâches',
            execute: () => {
                const active = app.supervisors.filter(s => s.status === 'actif').length;
                const log = `✉️  Rappels de tâches envoyés à ${active} superviseurs`;
                addExecutionLog(log);
                addNotification('info', 'Rappels Envoyés', `${active} superviseurs ont reçu les rappels`);
                showToast(log, 'success');
            }
        },
        'reset-counters': {
            name: 'Réinitialisation des compteurs',
            execute: () => {
                app.sales = [];
                app.supervisors.forEach(s => s.sales_day = 0);
                const log = `🔄 Compteurs réinitialisés`;
                addExecutionLog(log);
                addNotification('success', 'Compteurs Réinitialisés', 'Les ventes du jour ont été réinitialisées');
                showToast(log, 'success');
            }
        },
        'activate-inactive': {
            name: 'Activation des inactifs',
            execute: () => {
                const inactive = app.supervisors.filter(s => s.status === 'inactif').length;
                const log = `🔔 Notifications de réactivation envoyées à ${inactive} superviseurs`;
                addExecutionLog(log);
                addNotification('warning', 'Réactivation', `${inactive} superviseurs ont reçu une notification de réactivation`);
                showToast(log, 'warning');
            }
        }
    };

    if (routines[routineId]) {
        routines[routineId].execute();
    }
}

function executeAllRoutines() {
    console.log('🚀 Exécution de toutes les routines...');
    executeRoutine('verify-activity');
    executeRoutine('sales-report');
    executeRoutine('send-reminders');
    executeRoutine('reset-counters');
    executeRoutine('activate-inactive');
    showToast('🎉 Toutes les routines ont été exécutées!', 'success');
}

function addExecutionLog(message) {
    const logContainer = document.getElementById('execution-logs');
    const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const logEntry = document.createElement('p');
    logEntry.textContent = `[${time}] ${message}`;
    logContainer.insertBefore(logEntry, logContainer.firstChild);
}

// ========== MODALS ==========
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function addDistributor() {
    showToast('✅ Formulaire d\'ajout de distributeur (en développement)', 'info');
}

// ========== UTILITIES ==========
function syncData() {
    showToast('🔄 Synchronisation en cours...', 'info');
    setTimeout(() => {
        updateDashboard();
        showToast('✅ Synchronisation terminée!', 'success');
        addNotification('success', 'Synchronisation', 'Les données ont été mises à jour');
    }, 1500);
}

function search() {
    const query = document.getElementById('search-input').value;
    showToast(`🔍 Recherche: "${query}"`, 'info');
}

function generateReport() {
    showToast('📊 Rapport généré avec succès!', 'success');
}

function exportPDF() {
    showToast('📥 Export PDF en préparation...', 'info');
    setTimeout(() => {
        showToast('✅ PDF exporté!', 'success');
    }, 2000);
}

function viewRoutineLogs(routineId) {
    showToast('📋 Logs de ' + routineId, 'info');
}

function clearNotifications() {
    app.notifications = [];
    updateNotificationBadge();
    showToast('🗑️  Notifications supprimées', 'success');
}