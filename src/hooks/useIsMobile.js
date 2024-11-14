// src/hooks/useIsMobile.js

import { useState, useEffect } from 'react';

/**
 * Custom hook to determine if the current device is mobile.
 * A device is considered mobile if the viewport width is 768px or less.
 *
 * @returns {boolean} - Returns true if the device is mobile, false otherwise.
 */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(max-width: 768px)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(max-width: 768px)');

    // Handler to call on media query change
    const handleChange = (e) => {
      setIsMobile(e.matches);
    };

    // Initial check
    setIsMobile(mediaQuery.matches);

    // Add event listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // For older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup event listener on unmount
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // For older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return isMobile;
};

export default useIsMobile;

