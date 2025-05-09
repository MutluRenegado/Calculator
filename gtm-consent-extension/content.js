// Function to update GTM consent values
function updateGTMConsent(consent) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'consent_update',
        consent_data: consent
    });
}

// Check if consent data exists in local storage and apply it
function applyStoredConsent() {
    const consent = JSON.parse(localStorage.getItem('gtmConsent'));
    if (consent) {
        updateGTMConsent(consent);
    }
}

document.addEventListener('DOMContentLoaded', applyStoredConsent);
