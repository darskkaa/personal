

import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProjectBento from "@/components/dom/ProjectBento";

export function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }));
}

export default function ProjectDetail({ params }: { params: { id: string } }) {
    const project = projects.find((p) => p.id === params.id);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen w-full bg-background pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
                <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Mission Control
                </Link>
            </div>

            <ProjectBento project={project} />
        </div>
    );
}
