// Mock data for the application
const mockCallEvaluation = {
    call_summary: {
        reason: "The customer called to dispute an overdraft fee charged to their account.",
        resolution: "The agent waived the $34 fee as a one-time courtesy, explained overdraft protection options, and successfully cross-sold a credit card upgrade."
    },
    lead_quality: {
        status: "Not Relevant",
        details: "Not relevant. This call involves an existing customer, not a new prospect."
    },
    sales_representative: {
        status: "Relevant",
        details: "Relevant. The agent demonstrated professionalism and customer service. Examples: Addressed the issue empathetically, waived the fee, and cross-sold a credit card."
    },
    customer_sentiment: {
        status: "Relevant",
        details: "Relevant. The customer expressed satisfaction multiple times during the call. Examples: \"That would be greatly appreciated\" and \"I really appreciate your support.\""
    },
    common_objections: {
        status: "Relevant",
        details: "Relevant. The customer raised objections about the overdraft fee and was hesitant to open a savings account immediately. Examples: \"I'm upset about a recent overdraft fee\" and \"Could I do that later?\""
    },
    call_effectiveness: {
        status: "Relevant",
        details: "Relevant. The agent effectively resolved the issue, educated the customer, and achieved additional outcomes. Examples: Waived the fee, arranged check delivery, and upgraded the credit card."
    }
};

// Sample transcript format that users should follow
const sampleTranscriptFormat = [
    {
        "speaker": "Agent",
        "text": "Thank you for calling customer service. How may I assist you today?"
    },
    {
        "speaker": "Customer",
        "text": "Hi, I'm calling about an overdraft fee on my account."
    }
];

// You can provide this as an example when user tries to upload an invalid format
console.log('Sample transcript format:', sampleTranscriptFormat);
