import ThemeRegistry from "@/theme/ThemeRegistry";
import Header from "@/components/Header/Header"
import { Providers } from '../stores/Providers'
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
            <Header />
            {children}
          </Providers>
        </body>
      </ThemeRegistry>
    </html>
  );
}
