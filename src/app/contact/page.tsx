"use client";

import MagneticButton from "@/components/dom/MagneticButton";
import { ArrowUpRight } from "lucide-react";

export default function Contact() {
    return (
        <div className="min-h-screen w-full flex flex-col justify-center px-4 md:px-12 pt-24">
            <div className="max-w-7xl mx-auto w-full">
                <span className="text-sm font-mono text-gray-500 mb-8 block">(04)</span>

                <h1 className="text-[10vw] leading-[0.8] font-bold tracking-tighter text-white mb-24">
                    LET'S BUILD <br />
                    <span className="text-gray-500">THE NEXT THING</span>
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                    <div className="space-y-8">
                        <div className="flex flex-col gap-4">
                            <span className="text-sm font-mono text-accent-blue uppercase tracking-widest">
                                Get in touch
                            </span>
                            <MagneticButton strength={0.2}>
                                <a
                                    href="mailto:adilzaben@gmail.com"
                                    className="text-4xl md:text-6xl font-bold text-white hover:text-gray-300 transition-colors inline-flex items-center gap-4"
                                >
                                    adilzaben@gmail.com
                                </a>
                            </MagneticButton>
                        </div>

                        <div className="flex flex-col gap-4">
                            <span className="text-sm font-mono text-accent-green uppercase tracking-widest">
                                Socials
                            </span>
                            <div className="flex flex-wrap gap-6">
                                <MagneticButton>
                                    <a
                                        href="https://github.com/darskkaa"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2 text-white"
                                    >
                                        GitHub <ArrowUpRight className="w-4 h-4" />
                                    </a>
                                </MagneticButton>

                                <MagneticButton>
                                    <a
                                        href="https://linkedin.com/in/adilzaben"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2 text-white"
                                    >
                                        LinkedIn <ArrowUpRight className="w-4 h-4" />
                                    </a>
                                </MagneticButton>
                            </div>
                        </div>
                    </div>

                    <div className="text-right hidden md:block">
                        <p className="text-gray-500 font-mono text-sm">
                            BASED IN FLORIDA <br />
                            AVAILABLE FOR FREELANCE
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
