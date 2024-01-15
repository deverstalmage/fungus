import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getCurrentUser from '@/lib/user';
import styles from '@/app/layout.module.css';

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
          <div className={styles.hud}>
            <div>Energy: [ {user?.energy} / 100 ]</div>
            <div>Currency: 100</div>
          </div>
          {children}
          {modal}
        </div>
        <div id="modal-root" />
      </body>
    </html>
  );
}
