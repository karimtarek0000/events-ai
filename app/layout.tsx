import { ThemeProvider } from '@/components/theme/theme-provider'
import { cn } from '@/lib/utils'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Figtree, Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import Header from './components/layout/Navbar'
import ConfirmModal from './components/modal/ConfirmModal'
import './globals.css'
import { ConvexClientProvider } from './providers/ConvexClientProvider'

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' })

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'EventRAI',
    template: 'EventRAI - %s',
  },
  description: 'Event discovery, AI-powered recommendations, and seamless event management.',
  applicationName: 'EventRAI',
  generator: 'EventRAI',
  keywords: [
    'event',
    'discovery',
    'AI',
    'recommendations',
    'management',
    'event management',
    'event discovery',
    'AI-powered',
  ],
  openGraph: {
    title: 'EventRAI',
    description: 'Event discovery, AI-powered recommendations, and seamless event management.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        figtree.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <ConvexClientProvider>
            <Header />
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              disableTransitionOnChange
            >
              <main className="relative container mx-auto px-3">
                {children}

                <div className="pointer-events-none absolute -left-16 top-8 w-72 h-72 rounded-full opacity-80 bg-linear-to-tr from-blue-400 via-blue-300 to-transparent blur-[80px] -z-10" />
                <div className="pointer-events-none absolute right-20 top-32 w-96 h-96 rounded-full opacity-80 bg-linear-to-tr from-green-400 via-green-300 to-transparent blur-[100px] -z-10" />
              </main>
              <Toaster position="top-center" />
              <ConfirmModal />
            </ThemeProvider>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
