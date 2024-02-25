import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getCurrentUser from '@/lib/user';
import styles from '@/app/layout.module.css';
import Link from 'next/link';

const poppins = Poppins({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fungus Farmer',
  description: 'Forage for fungus and build your farm',
};

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) return;

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
        <div className={styles.layout}>
          <div><Link href={'/'}>Home</Link> | <Link href="/garden">Garden</Link> | <Link href="/inventory">Inventory</Link></div>
          <div className={styles.hud}>
            <div>Energy: [ {user.energy || 0} / 100 ]</div>
            <div>Fruit: {user.fruit || 0}</div>
            <div>Gold: {user.gold || 0}</div>
          </div>
          {children}
          {modal}
        </div>
        <div id="modal-root" />
      </body>
    </html>
  );
}
