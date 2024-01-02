
import './css/style.css'

import { Inter, Architects_Daughter } from 'next/font/google'
import Script from 'next/script'

import Header from '@/components/ui/header'
import Banner from '@/components/banner'
import { UserProvider } from './contexts/UserContext'
import { GoogleTagManager } from '@next/third-parties/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const architects_daughter = Architects_Daughter({
  subsets: ['latin'],
  variable: '--font-architects-daughter',
  weight: '400',
  display: 'swap'
})

export const metadata = {
  title: 'TunedIn',
  description: 'Personalized Audio Bytes',
  icons: {
    icon: '/images/logo3.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      
   
      <body className={`${inter.variable} ${architects_daughter.variable} font-inter antialiased bg-gray-900 text-gray-200 tracking-tight`}>
        <div className="flex flex-col min-h-screen overflow-hidden">
          {children}
        </div>
        <GoogleTagManager gtmId="G-K9W8W577K7" />

      </body>
    </html>
  )
}
