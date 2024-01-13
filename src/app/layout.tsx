import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import HUD from '@/app/hud';
import prisma from '@/lib/prisma';
import { ToastContainer } from 'react-toastify';

const poppins = Poppins({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fungus Farmer',
  description: 'Forage for fungus and build your farm',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = prisma.user.findUnique({ where: { id: 1 } });

  return (
    <html lang="en">
      <body className={poppins.className}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <HUD />
        {children}
      </body>
    </html>
  );
}
