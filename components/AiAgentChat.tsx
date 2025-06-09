"use client"

import { useChat } from "ai/react";
import { useUser } from "@clerk/nextjs";
import { ImageIcon, LetterText, PenIcon, SendHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

function AiAgentChat(videoID: { videoId: string }) {
    const videoId = videoID.videoId;
    const { user } = useUser();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
        api: "/api/chat",
        body: {
            videoId: videoId
        }
    });

    const generateScript = async () => {
        await append({
            role: "user",
            content: "Generate a shooting script for this video"
        });
    };

    const generateTitle = async () => {
        await append({
            role: "user",
            content: "Generate 5 title options for this video"
        });
    };

    const generateImage = async () => {
        await append({
            role: "user",
            content: "Generate a thumbnail for this video"
        });
    };

    // Scroll to bottom on new messages
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
                <h2 className="text-xl font-semibold text-white">AI Assistant</h2>
                <p className="text-sm text-white/60 mt-1">Ask questions about your video content</p>
            </div>

            {/* Messages Area */}
            <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6 bg-[#050816]/50">
                <div className="space-y-6 max-w-3xl mx-auto">
                    {messages.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center justify-center h-full min-h-[300px] rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-8"
                        >
                            <div className="text-center space-y-3">
                                <h3 className="text-xl font-medium text-white">
                                    Welcome! 👋
                                </h3>
                                <p className="text-white/60 max-w-sm">
                                    I'm your AI assistant, ready to help analyze your video content.
                                    Ask me anything about the video!
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="space-y-6">
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-lg p-4 ${
                                            message.role === "user"
                                                ? "bg-indigo-500/20 text-white"
                                                : "bg-white/5 text-white/90"
                                        }`}
                                    >
                                        <div className="prose prose-invert max-w-none">
                                            {message.content}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 bg-white/5 backdrop-blur-md p-4 sticky bottom-0 z-10">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Ask me anything about your video..."
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/60 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <SendHorizontal className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={generateScript}
                            className="text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-white"
                        >
                            <LetterText className="w-4 h-4" />
                            Generate Script
                        </button>
                        <button
                            type="button"
                            onClick={generateTitle}
                            className="text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-white"
                        >
                            <PenIcon className="w-4 h-4" />
                            Generate Title
                        </button>
                        <button
                            type="button"
                            onClick={generateImage}
                            className="text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-white"
                        >
                            <ImageIcon className="w-4 h-4" />
                            Generate Image
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AiAgentChat;