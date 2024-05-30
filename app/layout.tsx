import ThemeRegistry from "@/theme/ThemeRegistry";
import Header from "@/components/Header/Header"
import WhatsappButton from '@/components/WhatsappButton/WhatsappButton'
import Footer from '@/components/Footer/Footer'
import { Providers } from '../stores/Providers'
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'
import './global.css'

export const metadata = {
  title: 'Berautgourmet',
  description: 'Grupo Béraud'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <ThemeRegistry>
        <body>
          <Providers>
            <ProtectedRoute>
              <Header />
              {children}
              <Footer />
              <WhatsappButton />
            </ProtectedRoute>
          </Providers>
        </body>
      </ThemeRegistry>
    </html>
  );
}
