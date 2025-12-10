import { useState, useEffect } from 'react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<'pending' | 'accepted' | 'declined' | 'selected'>('pending');
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent');
    const savedPrefs = localStorage.getItem('cookiePreferences');
    
    if (savedConsent && savedPrefs) {
      setConsent(savedConsent as any);
      setPreferences(JSON.parse(savedPrefs));
    }
  }, []);

  const hasConsent = (type: keyof CookiePreferences) => {
    return preferences[type];
  };

  const updateConsent = (newPrefs: CookiePreferences, consentType: 'accepted' | 'declined' | 'selected') => {
    setPreferences(newPrefs);
    setConsent(consentType);
    localStorage.setItem('cookieConsent', consentType);
    localStorage.setItem('cookiePreferences', JSON.stringify(newPrefs));
  };

  const resetConsent = () => {
    localStorage.removeItem('cookieConsent');
    localStorage.removeItem('cookiePreferences');
    setConsent('pending');
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  return {
    consent,
    preferences,
    hasConsent,
    updateConsent,
    resetConsent,
  };
};