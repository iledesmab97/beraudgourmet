import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const colors = {
    primary: "#295386",
    secondary: "#4e5762",
    default: "#FFFFFF",
};

export function CurtainAnimation({ onComplete, storesStatus }) {
    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        // Verificar si la animación ya se ejecutó en esta sesión
        const hasAnimated = sessionStorage.getItem("hasAnimated");

        if (!hasAnimated) {
            setShouldAnimate(true); // Ejecutar animación
        } else {
            onComplete(); // Saltar animación y ejecutar el callback directamente
        }
    }, [onComplete]);

    const curtainVariants = {
        initial: { scaleX: 1 },
        animate: {
            scaleX: 0,
            transition: { duration: 1.5, ease: "easeInOut" },
        },
    };

    const handleAnimationComplete = () => {
        // Guardar en sessionStorage que la animación ya se ejecutó
        sessionStorage.setItem("hasAnimated", "true");
        onComplete();
    };

    if (!shouldAnimate) {
        // Si no se debe animar, no renderizamos las cortinas
        return null;
    }

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "100vh",
                width: "100%",
                overflow: "hidden",
                backgroundColor: colors.default,
                zIndex: 9999,
            }}
        >
            {storesStatus === "succeeded" ? (
                <>
                    {" "}
                    <motion.div
                        style={{
                            position: "absolute",
                            inset: 0,
                            originX: 0,
                            backgroundColor: colors.primary,
                        }}
                        variants={curtainVariants}
                        initial="initial"
                        animate="animate"
                        onAnimationComplete={handleAnimationComplete} // Manejar el final de la animación
                    />
                    <motion.div
                        style={{
                            position: "absolute",
                            inset: 0,
                            originX: 1,
                            backgroundColor: colors.primary,
                        }}
                        variants={curtainVariants}
                        initial="initial"
                        animate="animate"
                        // No se necesita onAnimationComplete aquí
                    />
                </>
            ) : (
                <></>
            )}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {" "}
                <motion.h1
                    style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: colors.default,
                    }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    Cargando...
                </motion.h1>
            </div>
        </div>
    );
}
