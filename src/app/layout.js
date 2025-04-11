import { AuthProvider } from './context/AuthContext';
import './globals.css';

export const metadata = {
  title: 'Sann Web',
  description: 'Website topup game dengan harga terbaik',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}