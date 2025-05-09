// Function to check and update consent for GTM
function updateConsent(adStorage, analyticsStorage, adUserData, adPersonalization, functionalityStorage, personalizationStorage, securityStorage) {
    const consent = {
        ad_storage: adStorage,
        analytics_storage: analyticsStorage,
        ad_user_data: adUserData,
        ad_personalization: adPersonalization,
        functionality_storage: functionalityStorage,
        personalization_storage: personalizationStorage,
        security_storage: securityStorage,
    };
  
    // Send consent to GTM
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'consent_update',
        consent_data: consent
    });

    // Save consent locally
    localStorage.setItem('gtmConsent', JSON.stringify(consent));
}

// Retrieve stored consent
function getStoredConsent() {
    return JSON.parse(localStorage.getItem('gtmConsent'));
}

// Apply consent based on stored data
document.addEventListener('DOMContentLoaded', () => {
    const consent = getStoredConsent();
    if (consent) {
        updateConsent(
            consent.ad_storage,
            consent.analytics_storage,
            consent.ad_user_data,
            consent.ad_personalization,
            consent.functionality_storage,
            consent.personalization_storage,
            consent.security_storage
        );
    }
});

