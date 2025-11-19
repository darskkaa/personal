"use client";

import { useEffect, useState } from "react";

const CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export default function TextScramble({ text, className }: { text: string; className?: string }) {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        let iteration = 0;
        let interval: NodeJS.Timeout;

        const startScramble = () => {
            clearInterval(interval);
            interval = setInterval(() => {
                setDisplayText(
                    text
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3;
            }, 30);
        };

        // Delay start slightly for dramatic effect
        const timeout = setTimeout(startScramble, 500);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [text]);

    return <span className={className}>{displayText}</span>;
}
