"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import { useState, useEffect } from "react";
import { Activity, Server, Terminal, Cpu, Globe } from "lucide-react";

// --- Sub-Components ---

const NarrativeModule = ({ project }: { project: Project }) => (
    <motion.div
        className="col-span-1 md:col-span-2 row-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-between group hover:border-accent-blue/50 transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
    >
        <div>
            <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-accent-blue tracking-widest uppercase border border-accent-blue/30 px-2 py-1 rounded-full">
                    System Online
                </span>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-mono text-green-500">LIVE</span>
                </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4">
                {project.title}
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                {project.description}
            </p>
        </div>

        <div className="flex flex-col gap-8 mt-8">
            <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-gray-300">
                        {t}
                    </span>
                ))}
            </div>

            {project.link && (
                <div>
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-accent-blue/10 border border-accent-blue/50 text-accent-blue font-mono text-sm uppercase tracking-widest hover:bg-accent-blue/20 transition-colors rounded-lg group-hover:shadow-[0_0_20px_rgba(0,94,255,0.3)]"
                    >
                        <Globe className="w-4 h-4" />
                        Launch System
                    </a>
                </div>
            )}
        </div>
    </motion.div>
);

const ArchitectureModule = ({ steps }: { steps?: string[] }) => {
    if (!steps) return null;

    return (
        <motion.div
            className="col-span-1 row-span-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col relative overflow-hidden group hover:border-accent-green/50 transition-colors"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <Server className="w-24 h-24 text-accent-green" />
            </div>

            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-accent-green" />
                Logic Pipeline
            </h3>

            <div className="flex-1 flex flex-col justify-center gap-4 relative z-10">
                {steps.map((step, i) => (
                    <div key={i} className="relative">
                        {i !== steps.length - 1 && (
                            <div className="absolute left-6 top-10 bottom-[-16px] w-0.5 bg-white/10" />
                        )}
                        <motion.div
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-accent-green/30 transition-all cursor-default"
                            whileHover={{ x: 5 }}
                        >
                            <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center border border-white/10 text-xs font-mono text-gray-400 shrink-0">
                                0{i + 1}
                            </div>
                            <span className="text-sm font-mono text-gray-200">{step}</span>
                        </motion.div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

const TelemetryModule = ({ data }: { data?: { label: string; value: string }[] }) => {
    if (!data) return null;

    return (
        <motion.div
            className="col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-between group hover:border-accent-blue/50 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Live Telemetry
            </h3>

            <div className="grid grid-cols-2 gap-4">
                {data.map((item, i) => (
                    <div key={i} className="bg-black/20 rounded-xl p-3 border border-white/5">
                        <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                        <div className="text-xl font-mono text-accent-blue font-bold">{item.value}</div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

const TerminalModule = ({ logs }: { logs?: string[] }) => {
    const [displayLogs, setDisplayLogs] = useState<string[]>([]);

    useEffect(() => {
        if (!logs) return;
        let i = 0;
        const interval = setInterval(() => {
            if (i < logs.length) {
                setDisplayLogs(prev => [...prev, logs[i]]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 800);
        return () => clearInterval(interval);
    }, [logs]);

    if (!logs) return null;

    return (
        <motion.div
            className="col-span-1 bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 font-mono text-xs overflow-hidden flex flex-col group hover:border-white/30 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                <Terminal className="w-4 h-4 text-gray-500" />
                <span className="text-gray-500">System Logs</span>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col gap-2">
                {displayLogs.map((log, i) => (
                    <div key={i} className="text-green-400/80 truncate">
                        <span className="text-gray-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                        {log}
                    </div>
                ))}
                <div className="w-2 h-4 bg-green-500 animate-pulse" />
            </div>
        </motion.div>
    );
};

// --- Main Component ---

export default function ProjectBento({ project }: { project: Project }) {
    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-auto md:grid-rows-[300px_200px] gap-4 md:gap-6">
                {/* Top Left: Narrative */}
                <NarrativeModule project={project} />

                {/* Right Column: Architecture */}
                <ArchitectureModule steps={project.architecture} />

                {/* Bottom Left: Telemetry */}
                <TelemetryModule data={project.telemetry} />

                {/* Bottom Center: Terminal */}
                <TerminalModule logs={project.terminalLog} />
            </div>
        </div>
    );
}
