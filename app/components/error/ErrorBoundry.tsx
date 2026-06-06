'use client'

import { ReactElement } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { FallbackRenderError } from './FallbackRenderError'

const ErrorBoundry = ({ children }: { children: ReactElement }) => {
  return <ErrorBoundary FallbackComponent={FallbackRenderError}>{children}</ErrorBoundary>
}

export default ErrorBoundry
