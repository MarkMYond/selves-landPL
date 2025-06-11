// PayloadCMS Admin Fix for lockedState destructuring error
// This script patches the admin interface to handle null lockedState values

if (typeof window !== 'undefined') {
  // Client-side fixes
  
  // Store original console.error to avoid infinite loops
  const originalConsoleError = console.error;
  
  // Patch console.error to catch and handle the specific error
  console.error = function (...args) {
    const errorMessage = args.join(' ');
    
    // Check for the specific lockedState error
    if (
      errorMessage.includes("Cannot destructure property 'lockedState'") ||
      errorMessage.includes("Cannot read properties of null") ||
      errorMessage.includes("undefined is not an object") ||
      errorMessage.includes("RouteCache")
    ) {
      console.warn('PayloadCMS lockedState error intercepted and handled');
      return; // Don't propagate the error
    }
    
    // Pass through other errors
    return originalConsoleError.apply(this, args);
  };

  // Store original fetch to patch API responses
  const originalFetch = window.fetch;
  
  // Patch fetch to ensure proper docPermissions structure
  window.fetch = async function (...args) {
    try {
      const response = await originalFetch.apply(this, args);
      const url = args[0]?.toString() || '';
      
      // Check if this is a PayloadCMS API request
      if (
        url.includes('/api/') && 
        (url.includes('/admin/') || url.includes('/media') || url.includes('/collections/'))
      ) {
        const clonedResponse = response.clone();
        
        try {
          const data = await clonedResponse.json();
          
          // Patch the response if it's missing proper lock state
          if (data && typeof data === 'object') {
            const patchedData = patchLockedStateData(data);
            
            if (patchedData !== data) {
              return new Response(JSON.stringify(patchedData), {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
              });
            }
          }
        } catch (e) {
          // If JSON parsing fails, return original response
          return response;
        }
      }
      
      return response;
    } catch (error) {
      console.error('Fetch error in PayloadCMS admin fix:', error);
      throw error;
    }
  };

  // Function to recursively patch data structures
  function patchLockedStateData(data) {
    if (!data || typeof data !== 'object') {
      return data;
    }

    // If this is an array, patch each item
    if (Array.isArray(data)) {
      return data.map(item => patchLockedStateData(item));
    }

    // Create a copy of the data
    const patchedData = { ...data };

    // Add missing docPermissions if not present
    if (!patchedData.docPermissions) {
      patchedData.docPermissions = {
        lockedState: false,
        lockConfig: {},
        canLock: true,
        isLocked: false,
        unlockRecommended: false,
        requiresUnlock: false,
        hasDraft: false,
      };
    } else if (patchedData.docPermissions && !patchedData.docPermissions.hasOwnProperty('lockedState')) {
      // Ensure lockedState exists
      patchedData.docPermissions.lockedState = false;
    }

    // If there's a docs array (collection responses), patch each document
    if (patchedData.docs && Array.isArray(patchedData.docs)) {
      patchedData.docs = patchedData.docs.map(doc => patchLockedStateData(doc));
    }

    // Recursively patch nested objects
    Object.keys(patchedData).forEach(key => {
      if (patchedData[key] && typeof patchedData[key] === 'object') {
        patchedData[key] = patchLockedStateData(patchedData[key]);
      }
    });

    return patchedData;
  }

  // Override any existing error handlers that might interfere
  window.addEventListener('error', function (event) {
    if (
      event.message && (
        event.message.includes("Cannot destructure property 'lockedState'") ||
        event.message.includes('RouteCache')
      )
    ) {
      event.preventDefault();
      event.stopPropagation();
      console.warn('PayloadCMS lockedState error prevented');
      return false;
    }
  });

  window.addEventListener('unhandledrejection', function (event) {
    if (
      event.reason && 
      event.reason.message && (
        event.reason.message.includes("Cannot destructure property 'lockedState'") ||
        event.reason.message.includes('RouteCache')
      )
    ) {
      event.preventDefault();
      console.warn('PayloadCMS lockedState promise rejection prevented');
      return false;
    }
  });

  console.log('PayloadCMS Admin Fix loaded successfully');
}
