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
    // icons: {
    //     icon: {
    //         href: "https://static.vecteezy.com/system/resources/thumbnails/012/634/759/small/art-deco-outline-stroke-in-golden-color-for-classy-and-luxury-style-premium-vintage-line-art-design-element-free-png.png",
    //         url: "https://static.vecteezy.com/system/resources/thumbnails/012/634/759/small/art-deco-outline-stroke-in-golden-color-for-classy-and-luxury-style-premium-vintage-line-art-design-element-free-png.png"
    //     }
    // }
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
