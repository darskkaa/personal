"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={`/work/${project.id}`} className="block group">
            <motion.div
                layoutId={`card-container-${project.id}`}
                className="relative w-full aspect-[4/3] bg-white/5 border border-white/10 overflow-hidden rounded-lg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Placeholder for Project Image/Visual */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-mono text-accent-blue tracking-wider">{project.year}</span>
                        <span className="text-xs font-mono text-white/50 tracking-wider uppercase">{project.category}</span>
                    </div>

                    <div>
                        <motion.h3
                            layoutId={`title-${project.id}`}
                            className="text-3xl font-bold text-white mb-2 tracking-tight group-hover:text-accent-green transition-colors"
                        >
                            {project.title}
                        </motion.h3>
                        <p className="text-sm text-gray-400 line-clamp-2 group-hover:text-white transition-colors">
                            {project.description}
                        </p>
                    </div>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                    className="absolute inset-0 bg-accent-blue/10 mix-blend-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        </Link>
    );
}
