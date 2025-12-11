import { useEffect } from 'react';

export const useAccessibility = () => {
  useEffect(() => {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white dark:focus:bg-gray-800 focus:text-red-600 focus:font-bold focus:rounded-lg';
    skipLink.textContent = 'Skip to main content';
    document.body.prepend(skipLink);

    // Add aria-live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.id = 'a11y-announcements';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);

    // Keyboard navigation enhancement
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-navigation');
    };

    document.addEventListener('keydown', handleTabKey);
    document.addEventListener('mousedown', handleMouseDown);

    // Focus trap for modals
    const setupFocusTrap = (modal: HTMLElement) => {
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleTabKey = (e: KeyboardEvent) => {
          if (e.key === 'Tab') {
            if (e.shiftKey) {
              if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
              }
            } else {
              if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
              }
            }
          }
        };

        modal.addEventListener('keydown', handleTabKey);
        firstElement.focus();

        return () => modal.removeEventListener('keydown', handleTabKey);
      }
    };

    return () => {
      document.removeEventListener('keydown', handleTabKey);
      document.removeEventListener('mousedown', handleMouseDown);
      skipLink.remove();
      liveRegion.remove();
    };
  }, []);
};

// Announcement utility
export const announceToScreenReader = (message: string) => {
  const liveRegion = document.getElementById('a11y-announcements');
  if (liveRegion) {
    liveRegion.textContent = message;
    // Clear after announcement
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  }
};