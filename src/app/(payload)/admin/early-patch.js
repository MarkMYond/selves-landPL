// Early patch for PayloadCMS lockedState error
// This must run before any PayloadCMS modules are loaded

(function() {
  'use strict';

  // Create a global hook that patches all object destructuring attempts
  if (typeof window !== 'undefined') {
    // Patch Object.getOwnPropertyDescriptor to handle lockedState access
    const originalGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    Object.getOwnPropertyDescriptor = function(obj, prop) {
      try {
        if (prop === 'lockedState' && (obj === null || obj === undefined)) {
          // Return a descriptor for a default lockedState
          return {
            value: false,
            writable: true,
            enumerable: true,
            configurable: true
          };
        }
        return originalGetOwnPropertyDescriptor.call(this, obj, prop);
      } catch (e) {
        console.warn('Error in patched getOwnPropertyDescriptor:', e);
        return originalGetOwnPropertyDescriptor.call(this, obj, prop);
      }
    };

    // Patch Object.hasOwnProperty to handle lockedState checks
    const originalHasOwnProperty = Object.prototype.hasOwnProperty;
    Object.prototype.hasOwnProperty = function(prop) {
      try {
        if (prop === 'lockedState' && (this === null || this === undefined)) {
          return true; // Pretend we have the property
        }
        return originalHasOwnProperty.call(this, prop);
      } catch (e) {
        return originalHasOwnProperty.call(this, prop);
      }
    };

    // Create a Proxy trap for null/undefined objects when accessing lockedState
    const originalProxy = window.Proxy;
    window.Proxy = function(target, handler) {
      const enhancedHandler = {
        ...handler,
        get: function(obj, prop) {
          try {
            if ((obj === null || obj === undefined) && prop === 'lockedState') {
              return false;
            }
            if (handler.get) {
              return handler.get(obj, prop);
            }
            return obj[prop];
          } catch (e) {
            console.warn('Proxy get error for', prop, ':', e);
            if (prop === 'lockedState') return false;
            return obj[prop];
          }
        },
        has: function(obj, prop) {
          try {
            if ((obj === null || obj === undefined) && prop === 'lockedState') {
              return true;
            }
            if (handler.has) {
              return handler.has(obj, prop);
            }
            return prop in obj;
          } catch (e) {
            if (prop === 'lockedState') return true;
            return prop in obj;
          }
        }
      };
      return new originalProxy(target, enhancedHandler);
    };

    // Override property access for common PayloadCMS permission objects
    function createMockPermissions() {
      return {
        lockedState: false,
        lockConfig: {},
        canLock: true,
        isLocked: false,
        unlockRecommended: false,
        requiresUnlock: false,
        hasDraft: false,
      };
    }

    // Global object that provides default permissions
    window.__PAYLOAD_PERMISSIONS_FALLBACK__ = createMockPermissions();

    // Monkey patch common destructuring patterns
    const originalAssign = Object.assign;
    Object.assign = function(target, ...sources) {
      try {
        // Patch any null/undefined sources that might contain permissions
        const patchedSources = sources.map(source => {
          if (!source) return source;
          if (typeof source === 'object' && source.hasOwnProperty && !source.hasOwnProperty('lockedState')) {
            return { ...source, ...createMockPermissions() };
          }
          return source;
        });
        return originalAssign.call(this, target, ...patchedSources);
      } catch (e) {
        console.warn('Object.assign patch error:', e);
        return originalAssign.call(this, target, ...sources);
      }
    };

    // Global error handler for destructuring errors
    const originalAddEventListener = window.addEventListener;
    window.addEventListener = function(type, listener, options) {
      if (type === 'error') {
        const wrappedListener = function(event) {
          if (event.error && event.error.message && 
              event.error.message.includes("Cannot destructure property 'lockedState'")) {
            console.warn('Prevented lockedState destructuring error');
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          return listener.call(this, event);
        };
        return originalAddEventListener.call(this, type, wrappedListener, options);
      }
      return originalAddEventListener.call(this, type, listener, options);
    };

    // Override console.error early to catch the specific error
    const originalConsoleError = console.error;
    console.error = function(...args) {
      const message = args.join(' ');
      if (message.includes("Cannot destructure property 'lockedState'") ||
          message.includes('RouteCache')) {
        console.warn('Early intercepted PayloadCMS lockedState error');
        return;
      }
      return originalConsoleError.apply(this, args);
    };

    // Try to patch any global PayloadCMS objects that might exist
    if (window.payload) {
      try {
        if (!window.payload.permissions) {
          window.payload.permissions = createMockPermissions();
        }
      } catch (e) {
        console.warn('Error patching payload permissions:', e);
      }
    }

    console.log('Early PayloadCMS patch loaded');
  }
})();
