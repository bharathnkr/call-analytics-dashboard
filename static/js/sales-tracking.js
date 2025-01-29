// Mock data for sales tracking
const mockSalesData = [
    {
        transcriptId: "TRSC-2501-A",
        willingness: "High",
        steps: {
            initialContact: true,
            fanInterest: true,
            packagePresentation: true,
            priceDiscussion: true,
            followupRequired: false
        },
        product: "season",
        rep: "rep1",
        status: "qualified"
    },
    {
        transcriptId: "TRSC-2502-B",
        willingness: "Medium",
        steps: {
            initialContact: true,
            fanInterest: true,
            packagePresentation: false,
            priceDiscussion: false,
            followupRequired: true
        },
        product: "premium",
        rep: "rep2",
        status: "contacted"
    },
    {
        transcriptId: "TRSC-2503-C",
        willingness: "High",
        steps: {
            initialContact: true,
            fanInterest: true,
            packagePresentation: true,
            priceDiscussion: false,
            followupRequired: true
        },
        product: "hospitality",
        rep: "rep1",
        status: "negotiating"
    },
    {
        transcriptId: "TRSC-2504-D",
        willingness: "Low",
        steps: {
            initialContact: true,
            fanInterest: false,
            packagePresentation: false,
            priceDiscussion: false,
            followupRequired: true
        },
        product: "group",
        rep: "rep3",
        status: "contacted"
    },
    {
        transcriptId: "TRSC-2505-E",
        willingness: "High",
        steps: {
            initialContact: true,
            fanInterest: true,
            packagePresentation: true,
            priceDiscussion: true,
            followupRequired: false
        },
        product: "season",
        rep: "rep2",
        status: "closed"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    setupFilterListeners();
    updateDashboard();
});

// Setup filter event listeners
function setupFilterListeners() {
    const filters = ['repFilter', 'productFilter', 'statusFilter', 'dateFilter'];
    filters.forEach(filter => {
        document.getElementById(filter).addEventListener('change', updateDashboard);
    });
}

// Update the dashboard based on filters
function updateDashboard() {
    const filters = getActiveFilters();
    const filteredData = filterSalesData(mockSalesData, filters);
    updateSalesTable(filteredData);
    updateSummaryMetrics(filteredData);
}

// Get current filter values
function getActiveFilters() {
    return {
        rep: document.getElementById('repFilter').value,
        product: document.getElementById('productFilter').value,
        status: document.getElementById('statusFilter').value,
        date: document.getElementById('dateFilter').value
    };
}

// Filter sales data based on selected filters
function filterSalesData(data, filters) {
    return data.filter(item => {
        const repMatch = filters.rep === 'all' || item.rep === filters.rep;
        const productMatch = filters.product === 'all' || item.product === filters.product;
        const statusMatch = filters.status === 'all' || item.status === filters.status;
        // In a real application, we would also filter by date
        return repMatch && productMatch && statusMatch;
    });
}

// Update the sales tracking table
function updateSalesTable(data) {
    const tableBody = document.getElementById('salesTableBody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        
        // Add transcript ID with link
        row.innerHTML = `<td><a href="#" onclick="viewTranscript('${item.transcriptId}')">${item.transcriptId}</a></td>`;
        
        // Add willingness with color coding
        const willingness = `<td><span class="badge bg-${getWillingnessBadgeColor(item.willingness)}">${item.willingness}</span></td>`;
        row.innerHTML += willingness;
        
        // Add step indicators
        Object.values(item.steps).forEach(step => {
            const stepCell = `<td>${getStepIndicator(step)}</td>`;
            row.innerHTML += stepCell;
        });
        
        tableBody.appendChild(row);
    });
}

// Update summary metrics
function updateSummaryMetrics(data) {
    // Total Leads
    document.getElementById('totalLeads').textContent = data.length;

    // Conversion Rate
    const closedDeals = data.filter(item => item.status === 'closed').length;
    const conversionRate = (closedDeals / data.length * 100).toFixed(1);
    document.getElementById('conversionRate').textContent = `${conversionRate}%`;

    // Average Deal Size (mock calculation)
    const avgDealSize = calculateAverageDealSize(data);
    document.getElementById('avgDealSize').textContent = formatCurrency(avgDealSize);

    // Revenue Target Progress (mock calculation)
    const targetProgress = calculateRevenueProgress(data);
    document.getElementById('revenueTarget').textContent = `${targetProgress}%`;
}

// Helper function to get willingness badge color
function getWillingnessBadgeColor(willingness) {
    switch(willingness.toLowerCase()) {
        case 'high':
            return 'success';
        case 'medium':
            return 'warning';
        case 'low':
            return 'danger';
        default:
            return 'secondary';
    }
}

// Helper function to get step indicator HTML
function getStepIndicator(completed) {
    return completed ? 
        '<i class="fas fa-check-circle text-success"></i>' : 
        '<i class="fas fa-times-circle text-danger"></i>';
}

// Helper function to calculate average deal size (mock data)
function calculateAverageDealSize(data) {
    const dealSizes = {
        'season': 5000,
        'premium': 8000,
        'group': 3000,
        'hospitality': 10000
    };

    const closedDeals = data.filter(item => item.status === 'closed');
    if (closedDeals.length === 0) return 0;

    const totalValue = closedDeals.reduce((sum, deal) => sum + dealSizes[deal.product], 0);
    return totalValue / closedDeals.length;
}

// Helper function to calculate revenue progress (mock data)
function calculateRevenueProgress(data) {
    const targetRevenue = 1000000; // $1M target
    const currentRevenue = calculateAverageDealSize(data) * data.filter(item => item.status === 'closed').length;
    return Math.min(Math.round((currentRevenue / targetRevenue) * 100), 100);
}

// Helper function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Function to handle transcript view (mock function)
function viewTranscript(transcriptId) {
    alert(`Viewing transcript: ${transcriptId}`);
    // In a real application, this would open the transcript viewer
}
