// Chart.js default options for consistent sizing and Mets colors
Chart.defaults.maintainAspectRatio = false;
Chart.defaults.responsive = true;

const METS_COLORS = {
    blue: '#004A8C',
    orange: '#FF5910',
    lightBlue: '#006BB6',
    darkBlue: '#003A70',
    grey: '#666666'
};

document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupFilterListeners();
    initializeDateFilters();
});

function setupFilterListeners() {
    document.getElementById('teamFilter').addEventListener('change', updateDashboard);
    document.getElementById('customerTypeFilter').addEventListener('change', updateDashboard);
}

function initializeDateFilters() {
    const dateRangeFilter = document.getElementById('dateRangeFilter');
    const customDateContainer = document.getElementById('customDateContainer');
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    const applyFilters = document.getElementById('applyFilters');
    const resetFilters = document.getElementById('resetFilters');

    // Set default dates
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    startDate.value = formatDate(thirtyDaysAgo);
    endDate.value = formatDate(today);
    endDate.max = formatDate(today);

    // Handle date range filter changes
    dateRangeFilter.addEventListener('change', function() {
        if (this.value === 'custom') {
            customDateContainer.style.display = 'block';
        } else {
            customDateContainer.style.display = 'none';
            const dates = calculateDateRange(this.value);
            startDate.value = formatDate(dates.start);
            endDate.value = formatDate(dates.end);
            updateDashboard();
        }
    });

    // Handle custom date changes
    startDate.addEventListener('change', validateDateRange);
    endDate.addEventListener('change', validateDateRange);

    // Handle filter buttons
    applyFilters.addEventListener('click', updateDashboard);
    resetFilters.addEventListener('click', resetAllFilters);
}

function calculateDateRange(range) {
    const today = new Date();
    const start = new Date();
    const end = new Date();

    switch(range) {
        case 'today':
            start.setHours(0, 0, 0, 0);
            break;
        case 'yesterday':
            start.setDate(today.getDate() - 1);
            start.setHours(0, 0, 0, 0);
            end.setDate(today.getDate() - 1);
            end.setHours(23, 59, 59, 999);
            break;
        case 'last7':
            start.setDate(today.getDate() - 7);
            break;
        case 'last30':
            start.setDate(today.getDate() - 30);
            break;
        case 'thisMonth':
            start.setDate(1);
            break;
        case 'lastMonth':
            start.setMonth(today.getMonth() - 1, 1);
            end.setMonth(today.getMonth(), 0);
            break;
    }

    return { start, end };
}

function validateDateRange() {
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    
    if (startDate.value && endDate.value) {
        if (new Date(startDate.value) > new Date(endDate.value)) {
            alert('Start date cannot be after end date');
            startDate.value = endDate.value;
        }
    }
}

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function resetAllFilters() {
    document.getElementById('teamFilter').value = 'all';
    document.getElementById('customerTypeFilter').value = 'all';
    document.getElementById('dateRangeFilter').value = 'last30';
    document.getElementById('gamePeriodFilter').value = 'all';
    document.getElementById('seasonFilter').value = '2025';
    
    const dates = calculateDateRange('last30');
    document.getElementById('startDate').value = formatDate(dates.start);
    document.getElementById('endDate').value = formatDate(dates.end);
    
    document.getElementById('customDateContainer').style.display = 'none';
    updateDashboard();
}

function getActiveFilters() {
    return {
        team: document.getElementById('teamFilter').value,
        customerType: document.getElementById('customerTypeFilter').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        gamePeriod: document.getElementById('gamePeriodFilter').value,
        season: document.getElementById('seasonFilter').value
    };
}

function updateDashboard() {
    const filters = getActiveFilters();
    console.log('Applying filters:', filters);
    // In a real application, this would fetch new data based on filters
    // For now, we'll just reinitialize with mock data
    initializeCharts();
}

function initializeCharts() {
    // Call Reasons - Horizontal Bar Chart
    const callReasonsCtx = document.getElementById('callReasons').getContext('2d');
    new Chart(callReasonsCtx, {
        type: 'bar',
        data: {
            labels: [
                'Ticket Exchange/Refunds',
                'Game Day Experience',
                'Season Ticket Inquiries',
                'Parking/Transportation',
                'Food & Beverage',
                'Special Events/Promotions',
                'Digital Ticketing Issues'
            ],
            datasets: [{
                label: 'Number of Calls',
                data: [350, 280, 250, 200, 180, 150, 120],
                backgroundColor: METS_COLORS.blue,
                borderColor: METS_COLORS.darkBlue,
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Sentiment Distribution - Vertical Bar Chart
    const sentimentCtx = document.getElementById('sentimentDistribution').getContext('2d');
    new Chart(sentimentCtx, {
        type: 'bar',
        data: {
            labels: ['Very Positive', 'Positive', 'Neutral', 'Negative', 'Very Negative'],
            datasets: [{
                data: [25, 35, 20, 15, 5],
                backgroundColor: [
                    METS_COLORS.orange,
                    METS_COLORS.lightBlue,
                    METS_COLORS.grey,
                    METS_COLORS.darkBlue,
                    METS_COLORS.blue
                ]
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Rep Performance - Pie Chart
    const repPerformanceCtx = document.getElementById('repPerformance').getContext('2d');
    new Chart(repPerformanceCtx, {
        type: 'pie',
        data: {
            labels: ['Excellent', 'Good', 'Average', 'Needs Improvement'],
            datasets: [{
                data: [40, 35, 15, 10],
                backgroundColor: [
                    METS_COLORS.blue,
                    METS_COLORS.lightBlue,
                    METS_COLORS.grey,
                    METS_COLORS.darkBlue
                ]
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 10,
                        font: {
                            size: 11
                        }
                    }
                }
            }
        }
    });

    // Customer Preferences - Horizontal Bar
    const preferencesCtx = document.getElementById('customerPreferences').getContext('2d');
    new Chart(preferencesCtx, {
        type: 'bar',
        data: {
            labels: [
                'Mobile App Features',
                'Premium Seating Options',
                'Family Packages',
                'Food Delivery to Seat',
                'VIP Experiences'
            ],
            datasets: [{
                label: 'Trend Score',
                data: [85, 75, 70, 65, 60],
                backgroundColor: METS_COLORS.orange
            }]
        },
        options: {
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Operational Issues - Horizontal Bar
    const issuesCtx = document.getElementById('operationalIssues').getContext('2d');
    new Chart(issuesCtx, {
        type: 'bar',
        data: {
            labels: [
                'Digital Ticket Access',
                'Mobile App Performance',
                'Entry Gate Delays',
                'Concession Wait Times',
                'Parking Navigation'
            ],
            datasets: [{
                label: 'Issue Frequency',
                data: [45, 40, 35, 30, 25],
                backgroundColor: METS_COLORS.blue
            }]
        },
        options: {
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}
