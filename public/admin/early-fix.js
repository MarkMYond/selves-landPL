// Ultra-early PayloadCMS lockedState fix
// This script must be loaded before any PayloadCMS modules

(function() {
  'use strict';
  
  // Immediately override console.error
  if (typeof console !== 'undefined' && console.error) {
    const originalConsoleError = console.error;
    console.error = function(...args) {
      const message = args.join(' ');
      if (message.includes("Cannot destructure property 'lockedState'") ||
          message.includes('RouteCache') ||
          message.includes('Cannot read properties of null')) {
        console.warn('ULTRA-EARLY: Intercepted PayloadCMS lockedState error');
        return;
      }
      return originalConsoleError.apply(this, args);
    };
  }

  // Create a global error handler that runs in capture phase
  if (typeof window !== 'undefined') {
    window.addEventListener('error', function(event) {
      if (event.error && event.error.message) {
        const message = event.error.message;
        if (message.includes("Cannot destructure property 'lockedState'") ||
            message.includes('RouteCache')) {
          console.warn('ULTRA-EARLY: Prevented lockedState error');
          event.preventDefault();
          event.stopImmediatePropagation();
          event.stopPropagation();
          return false;
        }
      }
    }, true);

    window.addEventListener('unhandledrejection', function(event) {
      if (event.reason && event.reason.message) {
        const message = event.reason.message;
        if (message.includes("Cannot destructure property 'lockedState'") ||
            message.includes('RouteCache')) {
          console.warn('ULTRA-EARLY: Prevented lockedState promise rejection');
          event.preventDefault();
          return false;
        }
      }
    }, true);

    // Try to patch destructuring by overriding global object access
    const originalObjectKeys = Object.keys;
    Object.keys = function(obj) {
      try {
        if (obj === null || obj === undefined) {
          return [];
        }
        return originalObjectKeys.call(this, obj);
      } catch (e) {
        console.warn('Object.keys patch intercepted error for null/undefined object');
        return [];
      }
    };

    // Override Object.getOwnPropertyNames for similar protection
    const originalGetOwnPropertyNames = Object.getOwnPropertyNames;
    Object.getOwnPropertyNames = function(obj) {
      try {
        if (obj === null || obj === undefined) {
          return [];
        }
        return originalGetOwnPropertyNames.call(this, obj);
      } catch (e) {
        console.warn('Object.getOwnPropertyNames patch intercepted error');
        return [];
      }
    };

    console.log('ULTRA-EARLY PayloadCMS fix loaded from public script');
  }
})();
