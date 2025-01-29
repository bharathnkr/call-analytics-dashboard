// Mock data for retention tracking
const mockRetentionData = [
    {
        transcriptId: "TRSC-2501-R",
        membershipLevel: "Platinum",
        requestType: "ticketing",
        priority: "High",
        status: "inProgress",
        lastContact: "2025-01-28",
        description: "Digital ticket access issues for upcoming game",
        rep: "rep1"
    },
    {
        transcriptId: "TRSC-2502-R",
        membershipLevel: "Gold",
        requestType: "benefits",
        priority: "Medium",
        status: "new",
        lastContact: "2025-01-27",
        description: "Question about VIP parking benefits",
        rep: "rep2"
    },
    {
        transcriptId: "TRSC-2503-R",
        membershipLevel: "Platinum",
        requestType: "renewal",
        priority: "High",
        status: "followUp",
        lastContact: "2025-01-26",
        description: "Early renewal discussion for next season",
        rep: "rep1"
    },
    {
        transcriptId: "TRSC-2504-R",
        membershipLevel: "Silver",
        requestType: "events",
        priority: "Low",
        status: "resolved",
        lastContact: "2025-01-25",
        description: "RSVP for upcoming member event",
        rep: "rep3"
    },
    {
        transcriptId: "TRSC-2505-R",
        membershipLevel: "Bronze",
        requestType: "upgrade",
        priority: "Medium",
        status: "inProgress",
        lastContact: "2025-01-28",
        description: "Interested in upgrading to Silver membership",
        rep: "rep2"
    }
];

// Mets theme colors
const METS_COLORS = {
    blue: '#004A8C',
    orange: '#FF5910',
    lightBlue: '#006BB6',
    darkBlue: '#003A70',
    grey: '#666666'
};

document.addEventListener('DOMContentLoaded', function() {
    setupFilterListeners();
    updateDashboard();
    initializeCharts();
});

function setupFilterListeners() {
    const filters = ['repFilter', 'membershipFilter', 'requestFilter', 'statusFilter'];
    filters.forEach(filter => {
        document.getElementById(filter).addEventListener('change', updateDashboard);
    });
}

function updateDashboard() {
    const filters = getActiveFilters();
    const filteredData = filterRetentionData(mockRetentionData, filters);
    updateRetentionTable(filteredData);
    updateSummaryMetrics(filteredData);
    updateCharts(filteredData);
}

function getActiveFilters() {
    return {
        rep: document.getElementById('repFilter').value,
        membership: document.getElementById('membershipFilter').value,
        request: document.getElementById('requestFilter').value,
        status: document.getElementById('statusFilter').value
    };
}

function filterRetentionData(data, filters) {
    return data.filter(item => {
        const repMatch = filters.rep === 'all' || item.rep === filters.rep;
        const membershipMatch = filters.membership === 'all' || item.membershipLevel.toLowerCase() === filters.membership;
        const requestMatch = filters.request === 'all' || item.requestType === filters.request;
        const statusMatch = filters.status === 'all' || item.status === filters.status;
        return repMatch && membershipMatch && requestMatch && statusMatch;
    });
}

function updateRetentionTable(data) {
    const tableBody = document.getElementById('retentionTableBody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="#" onclick="viewTranscript('${item.transcriptId}')">${item.transcriptId}</a></td>
            <td><span class="badge bg-${getMembershipBadgeColor(item.membershipLevel)}">${item.membershipLevel}</span></td>
            <td>${formatRequestType(item.requestType)}</td>
            <td><span class="badge bg-${getPriorityBadgeColor(item.priority)}">${item.priority}</span></td>
            <td><span class="badge bg-${getStatusBadgeColor(item.status)}">${formatStatus(item.status)}</span></td>
            <td>${formatDate(item.lastContact)}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewDetails('${item.transcriptId}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-outline-success" onclick="updateStatus('${item.transcriptId}')">
                    <i class="fas fa-check"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function updateSummaryMetrics(data) {
    // Mock calculations for summary metrics
    document.getElementById('activeMembers').textContent = '2,500';
    document.getElementById('retentionRate').textContent = '92%';
    document.getElementById('serviceScore').textContent = '4.8';
    document.getElementById('responseTime').textContent = '2.5h';
}

function initializeCharts() {
    // Request Types Chart
    const requestTypesCtx = document.getElementById('requestTypesChart').getContext('2d');
    new Chart(requestTypesCtx, {
        type: 'pie',
        data: {
            labels: ['Ticketing', 'Benefits', 'Renewal', 'Upgrade', 'Events'],
            datasets: [{
                data: [30, 25, 20, 15, 10],
                backgroundColor: [
                    METS_COLORS.blue,
                    METS_COLORS.orange,
                    METS_COLORS.lightBlue,
                    METS_COLORS.darkBlue,
                    METS_COLORS.grey
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Satisfaction Trend Chart
    const satisfactionCtx = document.getElementById('satisfactionChart').getContext('2d');
    new Chart(satisfactionCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Member Satisfaction',
                data: [4.5, 4.6, 4.7, 4.6, 4.8, 4.8],
                borderColor: METS_COLORS.blue,
                backgroundColor: METS_COLORS.lightBlue,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 4,
                    max: 5
                }
            }
        }
    });
}

// Helper functions
function getMembershipBadgeColor(level) {
    const colors = {
        'Platinum': 'info',
        'Gold': 'warning',
        'Silver': 'secondary',
        'Bronze': 'dark'
    };
    return colors[level] || 'primary';
}

function getPriorityBadgeColor(priority) {
    const colors = {
        'High': 'danger',
        'Medium': 'warning',
        'Low': 'success'
    };
    return colors[priority] || 'secondary';
}

function getStatusBadgeColor(status) {
    const colors = {
        'new': 'info',
        'inProgress': 'warning',
        'resolved': 'success',
        'followUp': 'danger'
    };
    return colors[status] || 'secondary';
}

function formatRequestType(type) {
    const types = {
        'ticketing': 'Ticketing Issues',
        'benefits': 'Membership Benefits',
        'renewal': 'Renewal Discussion',
        'upgrade': 'Upgrade Request',
        'events': 'Special Events'
    };
    return types[type] || type;
}

function formatStatus(status) {
    const statuses = {
        'new': 'New Request',
        'inProgress': 'In Progress',
        'resolved': 'Resolved',
        'followUp': 'Needs Follow-up'
    };
    return statuses[status] || status;
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

// Action functions
function viewTranscript(transcriptId) {
    alert(`Viewing transcript: ${transcriptId}`);
    // In a real application, this would open the transcript viewer
}

function viewDetails(transcriptId) {
    alert(`Viewing details for request: ${transcriptId}`);
    // In a real application, this would open a detailed view
}

function updateStatus(transcriptId) {
    alert(`Updating status for request: ${transcriptId}`);
    // In a real application, this would open a status update modal
}
