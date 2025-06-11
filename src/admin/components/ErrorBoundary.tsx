'use client'

import React, { Component, ReactNode, ErrorInfo } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class PayloadErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    console.warn('PayloadCMS ErrorBoundary caught an error:', error)
    
    // Check if this is the lockedState error we're trying to handle
    if (
      error.message.includes("Cannot destructure property 'lockedState'") ||
      error.message.includes('RouteCache') ||
      error.message.includes('Cannot read properties of null')
    ) {
      console.warn('PayloadCMS lockedState error caught by ErrorBoundary')
      // Don't show error UI for this specific error
      return { hasError: false }
    }
    
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error for debugging
    console.error('PayloadCMS ErrorBoundary details:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    })
    
    // Check if this is a lockedState error
    if (
      error.message.includes("Cannot destructure property 'lockedState'") ||
      error.message.includes('RouteCache') ||
      error.message.includes('Cannot read properties of null')
    ) {
      // Reset the error state for lockedState errors
      this.setState({ hasError: false, error: undefined })
      return
    }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        this.props.fallback || (
          <div style={{ 
            padding: '20px', 
            border: '1px solid #ff6b6b', 
            borderRadius: '4px', 
            backgroundColor: '#ffe0e0',
            color: '#d63031',
            margin: '10px'
          }}>
            <h3>Something went wrong</h3>
            <details style={{ marginTop: '10px' }}>
              <summary>Error details</summary>
              <pre style={{ 
                marginTop: '10px', 
                padding: '10px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '4px',
                fontSize: '12px',
                overflow: 'auto'
              }}>
                {this.state.error.message}
              </pre>
            </details>
            <button
              onClick={() => this.setState({ hasError: false, error: undefined })}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#d63031',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Try again
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}

export default PayloadErrorBoundary
