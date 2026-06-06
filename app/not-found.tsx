import Link from 'next/link'

export default function NotFound() {
  return (
    <main>
      <div>404</div>
      <h1>Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist or has been moved.</p>
      <Link href="/">Go Dashboard</Link>
    </main>
  )
}
