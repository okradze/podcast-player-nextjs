import React from 'react'
import styles from 'ErrorBoundary.module.scss'

type ErrorBoundaryProps = {
  children: React.ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError) {
      return (
        <section className={styles.wrapper}>
          <h1>Something went wrong! Please refresh page.</h1>
        </section>
      )
    }

    return children
  }
}

export default ErrorBoundary
