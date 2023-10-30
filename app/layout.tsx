import ThemeRegistry from "@/theme/ThemeRegistry";
import Header from "@/components/Header/Header"
import style from './page.module.css'

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
        <Header />
        <main className={style.primaryMain}>
          {children}
        </main>
      </ThemeRegistry>
    </html>
  );
}
