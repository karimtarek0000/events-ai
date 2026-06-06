import { FallbackProps } from 'react-error-boundary'

export function FallbackRenderError({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert" className="text-center space-y-5">
      <p>Something went wrong:</p>
      <p>{error instanceof Error ? error.message : String(error)}</p>
      <button onClick={resetErrorBoundary}>Reset Error</button>
    </div>
  )
}
