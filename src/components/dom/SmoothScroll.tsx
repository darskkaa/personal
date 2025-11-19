"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { motion, useScroll } from "framer-motion";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-accent-blue origin-left z-50 mix-blend-difference"
                style={{ scaleX: scrollYProgress }}
            />
            {children}
        </>
    );
}
