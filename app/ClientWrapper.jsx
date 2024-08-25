// app/components/ClientWrapper.tsx
"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CurtainAnimation } from "@/components/LoadingComponets/CurtainAnimation"; // Ajusta la ruta según sea necesario

export default function ClientWrapper({ children }) {
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verifica si la animación ya se ejecutó para esta ruta
        const hasAnimated = sessionStorage.getItem(`hasAnimated_${pathname}`);

        if (!hasAnimated) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [pathname]);

    const handleAnimationComplete = () => {
        // Guardar en sessionStorage que la animación ya se ejecutó para esta ruta
        sessionStorage.setItem(`hasAnimated_${pathname}`, "true");
        setLoading(false);
    };

    return (
        <>
            {loading && (
                <CurtainAnimation onComplete={handleAnimationComplete} />
            )}
            {!loading && children}
        </>
    );
}
