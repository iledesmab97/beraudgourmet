// app/layout.tsx
import React, { Suspense } from "react";
import ThemeRegistry from "@/theme/ThemeRegistry";
import Header from "@/components/Header/Header";
import WhatsappButton from "@/components/WhatsappButton/WhatsappButton";
import Footer from "@/components/Footer/Footer";
import { Providers } from "../stores/Providers";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import ClientWrapper from "@/app/ClientWrapper"; // Importa el nuevo componente cliente
import "./global.css";

export const metadata = {
    title: {
        template: "%s | Rows",
        default: "Rows"
    },
    description: "The Ecommerce Rows page",
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
                        <Suspense fallback={null}>
                            <ProtectedRoute>
                                <Header />
                                <ClientWrapper>{children}</ClientWrapper>
                                <Footer />
                                <WhatsappButton />
                            </ProtectedRoute>
                        </Suspense>
                    </Providers>
                </body>
            </ThemeRegistry>
        </html>
    );
}
