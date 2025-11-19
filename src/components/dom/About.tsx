"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const ParticleSystem = dynamic(() => import("@/components/canvas/ParticleSystem").then(mod => mod.ParticleSystem), { ssr: false });
const View = dynamic(() => import("@/components/canvas/View").then((mod) => mod.View), {
    ssr: false,
    loading: () => (
        <div className="flex h-96 w-full flex-col items-center justify-center">
            <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-black" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
        </div>
    ),
});

export default function About() {
    return (
        <section className="w-full py-24 px-4 md:px-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <span className="text-sm font-mono text-gray-500 mb-4 block">(02)</span>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-8">
                        Data-Driven <br /> Engineering
                    </h2>

                    <div className="space-y-8 text-gray-300 text-lg font-light">
                        <p>
                            My approach bridges the gap between systems engineering and creative expression.
                            At TruBridge, I didn't just analyze data; I architected pipelines to process
                            <span className="text-accent-blue font-bold"> 402,308 </span> records, revealing critical insights.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-white font-bold mb-2">Languages</h4>
                                <ul className="text-sm space-y-1 text-gray-400">
                                    <li>Python (Pandas/NumPy)</li>
                                    <li>C/C++</li>
                                    <li>TypeScript</li>
                                    <li>SQL</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-2">Frameworks</h4>
                                <ul className="text-sm space-y-1 text-gray-400">
                                    <li>Next.js / React</li>
                                    <li>Node.js</li>
                                    <li>Electron</li>
                                    <li>Three.js (R3F)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-[500px] w-full relative rounded-lg overflow-hidden border border-white/10 bg-white/5">
                    {/* 
              Note: In a real R3F setup with View, we would portal this into the main canvas.
              For now, we will just place a placeholder or a separate canvas if View is not set up globally.
              Given the current setup, we can try to render it directly if we had a separate canvas, 
              but since we have a global canvas, we should use a View or just let the global background handle it.
              
              However, the prompt asks for "Instanced 3D Particle System" for this specific data.
              I will create a dedicated Canvas for this section to ensure it's contained, 
              or better, use the View component pattern if I had set it up.
              
              Since I haven't set up the View pattern (tunneling), I will use a standalone Canvas for this component 
              to ensure it works out of the box without refactoring the global scene.
           */}
                    <div className="absolute inset-0">
                        {/* We need a Canvas here. */}
                        <Suspense fallback={null}>
                            {/* Importing Canvas dynamically to avoid SSR issues */}
                            <SceneComponent />
                        </Suspense>
                    </div>

                    <div className="absolute bottom-4 right-4 text-xs font-mono text-accent-green">
                        402k_RECORDS_VISUALIZED
                    </div>
                </div>
            </div>
        </section>
    );
}

// Helper to render the scene locally
import { Canvas } from "@react-three/fiber";
function SceneComponent() {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ParticleSystem />
        </Canvas>
    )
}
