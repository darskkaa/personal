"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="h-screen w-full flex flex-col justify-center px-4 md:px-12 pointer-events-none">
            <div className="max-w-7xl mx-auto w-full z-10 mix-blend-difference">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="text-[12vw] leading-[0.85] font-bold tracking-tighter text-white">
                        ADIL
                        <br />
                        ZABEN
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                    className="mt-8 flex flex-col md:flex-row gap-4 md:items-end justify-between"
                >
                    <div className="text-xl md:text-2xl font-light tracking-tight text-gray-300 max-w-md">
                        <p>Creative Technologist &</p>
                        <p>Computer Science Undergraduate</p>
                    </div>

                    <div className="text-sm uppercase tracking-widest text-accent-blue">
                        Based in Florida
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
