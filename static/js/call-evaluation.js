document.addEventListener('DOMContentLoaded', function() {
    // Use mock data from mock-data.js
    updateCallSummary(mockCallEvaluation.call_summary);
    updateEvaluationMetrics(mockCallEvaluation);
    
    // Fetch and display the transcript
    fetch('static/js/b16ebabc-d4d3-4f2c-9eee-498b2b765557-transcriptions.json')
        .then(response => response.json())
        .then(data => {
            displayTranscript(data);
        })
        .catch(error => console.error('Error loading transcript:', error));
});

function updateCallSummary(summary) {
    document.getElementById('reason').textContent = summary.reason;
    document.getElementById('resolution').textContent = summary.resolution;
}

function updateEvaluationMetrics(data) {
    const metricsContainer = document.getElementById('evaluationMetrics');
    const metrics = [
        {
            key: 'lead_quality',
            title: 'Lead Quality',
            data: data.lead_quality
        },
        {
            key: 'sales_representative',
            title: 'Sales Representative Performance',
            data: data.sales_representative
        },
        {
            key: 'customer_sentiment',
            title: 'Customer Sentiment',
            data: data.customer_sentiment
        },
        {
            key: 'common_objections',
            title: 'Common Objections',
            data: data.common_objections
        },
        {
            key: 'call_effectiveness',
            title: 'Call Effectiveness',
            data: data.call_effectiveness
        }
    ];
    
    const metricsHTML = metrics.map(metric => {
        const isPositive = metric.data.status !== 'Not Relevant';
        const statusIcon = isPositive ? 
            '<i class="fas fa-check-circle status-icon positive"></i>' : 
            '<i class="fas fa-times-circle status-icon negative"></i>';
        
        return `
            <div class="col-md-6 mb-4">
                <div class="evaluation-card">
                    ${statusIcon}
                    <h5>${metric.title}</h5>
                    <p>${metric.data.details}</p>
                </div>
            </div>
        `;
    }).join('');
    
    metricsContainer.innerHTML = metricsHTML;
}

function formatTimestamp(isoTimestamp, startOffset) {
    const date = new Date(isoTimestamp);
    const minutes = Math.floor(startOffset / 60000);
    const seconds = Math.floor((startOffset % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function displayTranscript(transcriptData) {
    const transcriptContent = document.getElementById('transcriptContent');
    const timestamp = transcriptData.timestamp;
    
    const transcriptHTML = transcriptData.turns.map(turn => {
        const messageClass = turn.participantType.toLowerCase();
        const timeFormatted = formatTimestamp(timestamp, turn.startOffset);
        
        return `
            <div class="transcript-message ${messageClass}">
                <div class="timestamp">${timeFormatted}</div>
                <div class="speaker">${turn.participantType}</div>
                <div class="text">${turn.words}</div>
            </div>
        `;
    }).join('');
    
    transcriptContent.innerHTML = transcriptHTML;
    
    // Scroll to the bottom of the transcript
    transcriptContent.scrollTop = transcriptContent.scrollHeight;
}
