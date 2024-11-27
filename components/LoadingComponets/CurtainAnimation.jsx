import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BaguetteSpinner } from "@/components/LoadingComponets/BaguetteSpinner";

const colors = {
    primary: "#295386",
    secondary: "#4e5762",
    default: "#FFFFFF",
};

export function CurtainAnimation({ onComplete }) {
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [curtainsClosed, setCurtainsClosed] = useState(true); // Estado para mantener las cortinas cerradas si el status no es 'succeeded'

    useEffect(() => {
        const hasAnimated = sessionStorage.getItem("hasAnimated");

        setTimeout(() => {
            if (!hasAnimated) {
                setShouldAnimate(true); // Ejecutar la animación
                setCurtainsClosed(false);
            } else {
                onComplete();
            }
        }, 1500)
    }, [onComplete]);

    const curtainVariants = {
        initial: { scaleX: 1 },
        animate: {
            scaleX: 0,
            transition: { duration: 1.5, ease: "easeInOut" },
        },
    };

    const handleAnimationComplete = () => {
        sessionStorage.setItem("hasAnimated", "true");
        setCurtainsClosed(false); // Las cortinas deben abrirse después de la animación
        onComplete();
    };

    // Renderizar las cortinas cerradas en color azul si el status no es 'succeeded'
    if (curtainsClosed) {
        return (
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: "100vh",
                    width: "100%",
                    overflow: "hidden",
                    backgroundColor: colors.primary, // Azul cuando cerradas
                    zIndex: 9999,
                }}
            >
                <BaguetteSpinner loading={curtainsClosed} />
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: colors.primary, // Azul cuando cerradas
                    }}
                />
            </div>
        );
    }

    // Renderizar animación solo si shouldAnimate es true
    if (shouldAnimate) {
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
                    onAnimationComplete={handleAnimationComplete}
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
                />
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <motion.h1
                        style={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                            color: colors.default,
                        }}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.5, delay: 1 }}
                    ></motion.h1>
                </div>
            </div>
        );
    }
}
