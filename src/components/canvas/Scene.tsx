"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { LiquidBackground } from "./LiquidBackground";

export default function Scene({ children, ...props }: any) {
    return (
        <Canvas {...props} dpr={[1, 1.5]} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1 }}>
            <LiquidBackground />
            <Preload all />
            {children}
        </Canvas>
    );
}
