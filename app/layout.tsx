import ThemeRegistry from "@/theme/ThemeRegistry";


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
        {children}
      </ThemeRegistry>
    </html>
  );
}
