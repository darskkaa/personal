"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Project } from "@/data/projects";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project }: { project: Project }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <Link href={`/work/${project.id}`}>
            <motion.div
                className="group relative w-full aspect-[4/3] bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors"
                onMouseMove={handleMouseMove}
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                layoutId={`project-${project.id}`}
            >
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                650px circle at ${mouseX}px ${mouseY}px,
                                rgba(255, 255, 255, 0.15),
                                transparent 80%
                            )
                        `,
                    }}
                />

                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-mono text-gray-400 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-full bg-black/20 backdrop-blur-md">
                            {project.category}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className="w-4 h-4 text-white" />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-accent-blue transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">
                            {project.description}
                        </p>
                    </div>
                </div>

                {/* Background Gradient/Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-0" />
            </motion.div>
        </Link>
    );
}
