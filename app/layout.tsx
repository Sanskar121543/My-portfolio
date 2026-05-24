import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Sanskar Shimpi | Software & ML Engineer',
  description: 'MS Computer Science at NYU Tandon. Building distributed systems, ML pipelines, and scalable infrastructure. Open source contributor to MLflow, Apache Airflow, LangChain, and FastAPI.',
  keywords: ['Software Engineer', 'ML Engineer', 'Distributed Systems', 'NYU', 'MLOps', 'Computer Vision', 'Backend Developer'],
  authors: [{ name: 'Sanskar Shimpi' }],
  creator: 'Sanskar Shimpi',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Sanskar Shimpi | Software & ML Engineer',
    description: 'MS Computer Science at NYU Tandon. Building distributed systems, ML pipelines, and scalable infrastructure.',
    siteName: 'Sanskar Shimpi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanskar Shimpi | Software & ML Engineer',
    description: 'MS Computer Science at NYU Tandon. Building distributed systems, ML pipelines, and scalable infrastructure.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a1f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
