'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: VoidFunction
}) {
  return (
    <html>
      <body>
        <div>
          <h2>{error.message}</h2>
          <button onClick={() => reset()}>Try again</button>
        </div>
      </body>
    </html>
  )
}
