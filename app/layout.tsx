import ThemeRegistry from "@/theme/ThemeRegistry";
import Header from "@/components/Header/Header"

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
        {children}
      </ThemeRegistry>
    </html>
  );
}
