import React, { useState, useEffect } from 'react';
import { Cookie, X, Settings, Check, Shield } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  // Check if user has already made a choice
  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    setIsVisible(false);
    
    // Initialize analytics/marketing scripts here
    initializeCookies(allAccepted);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('cookieConsent', 'selected');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setIsVisible(false);
    setIsSettingsOpen(false);
    
    // Initialize based on selected preferences
    initializeCookies(preferences);
  };

  const handleDecline = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(onlyNecessary);
    localStorage.setItem('cookieConsent', 'declined');
    localStorage.setItem('cookiePreferences', JSON.stringify(onlyNecessary));
    setIsVisible(false);
    
    // Only initialize necessary cookies
    initializeCookies(onlyNecessary);
  };

  const initializeCookies = (prefs: CookiePreferences) => {
    // Initialize Google Analytics (example)
    if (prefs.analytics) {
      console.log('Initializing analytics cookies...');
      // window.gtag('config', 'GA_MEASUREMENT_ID', {...});
    }

    // Initialize marketing cookies (example)
    if (prefs.marketing) {
      console.log('Initializing marketing cookies...');
      // Facebook Pixel, etc.
    }

    // Always initialize necessary cookies
    console.log('Necessary cookies initialized');
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Necessary cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const CookieType = ({ 
    title, 
    description, 
    type, 
    required = false 
  }: { 
    title: string; 
    description: string; 
    type: keyof CookiePreferences; 
    required?: boolean; 
  }) => (
    <div className="flex items-start justify-between p-4 border rounded-lg">
      <div className="flex-1 mr-4">
        <div className="flex items-center">
          <h4 className="font-semibold text-gray-900">{title}</h4>
          {required && (
            <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              Always active
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      <div className="flex items-center">
        {required ? (
          <div className="w-10 h-6 bg-red-100 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-red-600" />
          </div>
        ) : (
          <button
            onClick={() => togglePreference(type)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              preferences[type] ? 'bg-green-500' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                preferences[type] ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        )}
      </div>
    </div>
  );

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop for settings modal */}
      {isSettingsOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[9999] transition-opacity"
          onClick={() => setIsSettingsOpen(false)}
        />
      )}

      {/* Main Cookie Consent Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[10000] animate-slide-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-t-2xl shadow-2xl border-t border-x border-gray-200 p-6">
            {/* Main Content */}
            {!isSettingsOpen ? (
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex-1 mb-4 md:mb-0 md:mr-8">
                  <div className="flex items-center mb-3">
                    <Cookie className="w-6 h-6 text-red-600 mr-2" />
                    <h3 className="text-lg font-bold text-gray-900">
                      Your Privacy Matters
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    We use cookies to enhance your browsing experience, serve personalized content, 
                    and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                  </p>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <Shield className="w-4 h-4 mr-1" />
                    <span>
                      <button 
                        onClick={() => setIsSettingsOpen(true)}
                        className="text-red-600 hover:underline mr-2"
                      >
                        Cookie Settings
                      </button>
                      •
                      <a 
                        href="/privacy-policy" 
                        className="ml-2 text-red-600 hover:underline"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                  <button
                    onClick={handleDecline}
                    className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap"
                  >
                    Decline All
                  </button>
                  <button
                    onClick={handleAcceptSelected}
                    className="px-6 py-2.5 border-2 border-red-600 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors whitespace-nowrap"
                  >
                    Accept Selected
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-2.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            ) : (
              // Settings Modal
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                      <Settings className="w-6 h-6 text-red-600 mr-2" />
                      Cookie Preferences
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Manage your cookie preferences. You can change these settings at any time.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  <CookieType
                    title="Strictly Necessary Cookies"
                    description="These cookies are essential for the website to function properly. They enable basic functions like page navigation and access to secure areas."
                    type="necessary"
                    required
                  />
                  
                  <CookieType
                    title="Analytics Cookies"
                    description="These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously."
                    type="analytics"
                  />
                  
                  <CookieType
                    title="Marketing Cookies"
                    description="These cookies are used to track visitors across websites to display relevant advertisements."
                    type="marketing"
                  />
                </div>

                <div className="mt-8 flex justify-between items-center pt-6 border-t">
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={handleDecline}
                      className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Decline All
                    </button>
                    <button
                      onClick={handleAcceptSelected}
                      className="px-6 py-2.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};