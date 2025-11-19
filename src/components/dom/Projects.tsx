"use client";

import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
    return (
        <section className="w-full py-24 px-4 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-12">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
                        Selected Work
                    </h2>
                    <span className="text-sm font-mono text-gray-500 hidden md:block">
                        (03)
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}
