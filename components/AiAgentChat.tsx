"use client"
import {useChat}from "@ai-sdk/react"
import { Button } from "./ui/button"
import ReactMarkdown from "react-markdown"

interface ToolInvocation{
    toolCallId : string;
    toolName : string;
    result? :Record <string, unknown>
}
interface ToolPart{
    type : "tool-invocation";
    toolInvocation : ToolInvocation
}

const formatToolInvocation = (part: ToolPart) : string => {
    if(!part.toolInvocation) return "Unknown Tool";
    return `Tool used : ${part.toolInvocation.toolName}`;
}
function AiAgentChat(videoID:{videoId: string}){
    const videoId = videoID.videoId 
    const {messages, input, handleInputChange, handleSubmit} = useChat({
        maxSteps : 5,
        body : {
            videoId
        }
    })

    return(
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-white">
                <h2 className="text-xl font-semibold text-gray-800">AI Assistant</h2>
                <p className="text-sm text-gray-500 mt-1">Ask questions about your video content</p>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50">
                <div className="space-y-6 max-w-3xl mx-auto">
                    {messages.length === 0 && (
                        <div className="flex items-center justify-center h-full min-h-[300px] bg-white rounded-xl border border-gray-200 p-8">
                            <div className="text-center space-y-3">
                                <h3 className="text-xl font-medium text-gray-700">
                                    Welcome! 👋
                                </h3>
                                <p className="text-gray-500 max-w-sm">
                                    I'm your AI assistant, ready to help analyze your video content. 
                                    Ask me anything about the video!
                                </p>
                            </div>
                        </div>
                    )}

                    {messages.map((m) => (
                        <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div 
                                className={`max-w-[85%] ${
                                    m.role === "user" 
                                        ? "bg-blue-600 text-white" 
                                        : "bg-white border border-gray-200"
                                } rounded-2xl px-6 py-4 shadow-sm`}
                            >
                                {m.parts && m.role === "assistant" ? (
                                    // AI message
                                    <div className="space-y-3">
                                        {m.parts.map((part, i) =>
                                        part.type === "text" ? (
                                            <div key={i} className="prose prose-sm max-w-none">
                                            <ReactMarkdown>{part.text}</ReactMarkdown>
                                            </div>
                                        ) : part.type === "tool-invocation" ? (
                                            <div
                                            key={i}
                                            className="bg-white/50 rounded-lg p-2 space-y-2 text-gray-800"
                                            >
                                            <div className="font-medium text-xs">
                                                {formatToolInvocation(part as ToolPart)}
                                            </div>
                                            {(part as ToolPart).toolInvocation.result && (
                                                <pre className="text-xs bg-white/75 p-2 rounded overflow-auto max-h-40">
                                                {JSON.stringify(
                                                    (part as ToolPart).toolInvocation.result,
                                                    null,
                                                    2
                                                )}
                                                </pre>
                                            )}
                                            </div>
                                        ) : null
                                        )}
                                    </div>
                                    ) : (
                                        <div className="prose prose-sm max-w-none text-white">
                                            <ReactMarkdown>{m.content}</ReactMarkdown>
                                        </div>
                                    )}

                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Input Form */}
            <div className="border-t border-gray-200 p-6 bg-white">
                <form onSubmit={handleSubmit} className="flex gap-3 max-w-3xl mx-auto">
                    <input
                        className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                        type="text"
                        placeholder="Ask a question about your video..."
                        value={input}
                        onChange={handleInputChange}
                    />
                    <Button 
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Send
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default AiAgentChat;