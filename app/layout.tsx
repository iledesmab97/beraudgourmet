// app/layout.tsx
import React from "react";
import ThemeRegistry from "@/theme/ThemeRegistry";
import Header from "@/components/Header/Header";
import WhatsappButton from "@/components/WhatsappButton/WhatsappButton";
import Footer from "@/components/Footer/Footer";
import { Providers } from "../stores/Providers";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import ClientWrapper from "@/app/ClientWrapper"; // Importa el nuevo componente cliente
import "./global.css";

export const metadata = {
    title: "Berautgourmet",
    description: "Grupo Béraud",
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
                            <ClientWrapper>{children}</ClientWrapper>
                            <Footer />
                            <WhatsappButton />
                        </ProtectedRoute>
                    </Providers>
                </body>
            </ThemeRegistry>
        </html>
    );
}
