"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, X, MessageSquare } from "lucide-react";

type Message = {
    role: "user" | "model";
    text: string;
};

export default function ChatInterface() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "model", text: "Hi! I'm Adil's AI assistant. Ask me anything about his work or experience." }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
        setIsLoading(true);

        try {
            // Format history for Gemini (excluding the system prompt which is handled in backend)
            const history = messages.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage, history }),
            });

            const data = await response.json();

            if (data.text) {
                setMessages((prev) => [...prev, { role: "model", text: data.text }]);
            } else {
                throw new Error("No response text");
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [...prev, { role: "model", text: "Sorry, I encountered an error. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <motion.button
                className="fixed bottom-8 right-8 z-50 p-4 bg-accent-blue rounded-full shadow-lg text-white hover:bg-blue-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-4 md:right-8 w-[90vw] md:w-[400px] h-[500px] max-h-[70vh] md:max-h-[80vh] bg-[#1a1b26]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent-green/20 flex items-center justify-center text-accent-green">
                                <Bot className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm">Adil AI</h3>
                                <span className="text-xs text-green-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    Online
                                </span>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                                >
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-white/10" : "bg-accent-green/20 text-accent-green"
                                            }`}
                                    >
                                        {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                    </div>
                                    <div
                                        className={`p-3 rounded-2xl text-sm max-w-[80%] ${msg.role === "user"
                                            ? "bg-accent-blue text-white rounded-tr-none"
                                            : "bg-white/5 text-gray-200 rounded-tl-none border border-white/5"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-accent-green/20 flex items-center justify-center shrink-0 text-accent-green">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1 items-center">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-white/5">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about Adil's projects..."
                                    className="w-full bg-black/20 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-accent-blue transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
