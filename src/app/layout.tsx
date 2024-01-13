import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import HUD from '@/app/components/hud';

const poppins = Poppins({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fungus Farmer',
  description: 'Forage for fungus and build your farm',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <HUD />
        {children}
      </body>
    </html>
  )
}
