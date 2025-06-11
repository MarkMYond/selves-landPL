'use client'

import { useEffect } from 'react'

export function GlobalErrorHandler() {
  useEffect(() => {
    // This runs immediately when the component mounts
    const handleError = (error: Error, errorInfo?: any) => {
      if (error.message.includes("Cannot destructure property 'lockedState'") ||
          error.message.includes('RouteCache') ||
          error.message.includes('Cannot read properties of null')) {
        console.warn('GlobalErrorHandler: Caught and suppressed lockedState error')
        return true // Error handled
      }
      return false // Let other errors through
    }

    // Override React's error handling
    const originalConsoleError = console.error
    console.error = (...args) => {
      const message = args.join(' ')
      if (message.includes("Cannot destructure property 'lockedState'") ||
          message.includes('RouteCache') ||
          message.includes('Cannot read properties of null')) {
        console.warn('GlobalErrorHandler: Suppressed console error')
        return
      }
      originalConsoleError.apply(console, args)
    }

    // Global error handler
    const errorHandler = (event: ErrorEvent) => {
      if (handleError(event.error)) {
        event.preventDefault()
        event.stopPropagation()
        return false
      }
    }

    // Unhandled promise rejection handler
    const rejectionHandler = (event: PromiseRejectionEvent) => {
      if (event.reason && handleError(event.reason)) {
        event.preventDefault()
        return false
      }
    }

    window.addEventListener('error', errorHandler, true)
    window.addEventListener('unhandledrejection', rejectionHandler, true)

    // Cleanup
    return () => {
      window.removeEventListener('error', errorHandler, true)
      window.removeEventListener('unhandledrejection', rejectionHandler, true)
      console.error = originalConsoleError
    }
  }, [])

  return null // This component doesn't render anything
}
