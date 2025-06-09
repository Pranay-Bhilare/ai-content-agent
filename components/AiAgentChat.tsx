"use client"
import {Message, useChat}from "@ai-sdk/react"
import { Button } from "./ui/button"
import ReactMarkdown from "react-markdown"
import { ImageIcon, LetterText, PenIcon } from "lucide-react";
import remarkGfm from "remark-gfm";

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
    const {messages, input, handleInputChange, handleSubmit, append} = useChat({
        maxSteps : 5,
        body : {
            videoId
        }
    })
    const generateScript = async () => {
        const randomId = Math.random().toString(36).substring(2, 15);
      
        const userMessage: Message = {
          id: `generate-script-${randomId}`,
          role: "user",
          content:
            "Generate a step-by-step shooting script for this video that I can use on my own channel to produce a video that is similar to this one, don't do any other steps such as generating an image, just generate the script only!",
        };
      
        append(userMessage);
      };
    
      const generateTitle = async () => {
        const randomId = Math.random().toString(36).substring(2, 15);
      
        const userMessage: Message = {
          id: `generate-title-${randomId}`,
          role: "user",
          content:
            "Generate a title for this video",
        };
      
        append(userMessage);
      }
      const generateImage = async () => {
        const randomId = Math.random().toString(36).substring(2, 15);
      
        const userMessage: Message = {
          id: `generate-image-${randomId}`,
          role: "user",
          content:
            "Generate a thumbnail for this video",
        };
      
        append(userMessage);
      }
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
                                {m.role === "assistant" ? (
                                    <div className="prose prose-sm max-w-none">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
                                                h2: ({node, ...props}) => <h2 className="text-xl font-semibold mt-3 mb-2" {...props} />,
                                                h3: ({node, ...props}) => <h3 className="text-lg font-medium mt-2 mb-1" {...props} />,
                                                p: ({node, ...props}) => <p className="text-base leading-relaxed mb-2" {...props} />,
                                                ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2" {...props} />,
                                                ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2" {...props} />,
                                                li: ({node, ...props}) => <li className="ml-4 mb-1" {...props} />,
                                            }}
                                        >
                                            {m.content}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    <div className="prose prose-sm max-w-none prose-invert">
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
                <div className="flex gap-2">
                    <button
                        className="text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={generateScript}
                        type="button"
                    >
                        <LetterText className="w-4 h-4 text-black" />
                        <div className="text-black">
                            Generate Script
                        </div>
                        
                    </button>
                    <button
                        className="text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={generateTitle}
                        type="button"
                        >
                        <PenIcon className="w-4 h-4 text-black" />
                        <div className="text-black">
                        Generate Title
                        </div>
                    </button>

                    <button
                        className="text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={generateImage}
                        type="button"
                        >
                        <ImageIcon className="w-4 h-4 text-black"/>
                        <div className="text-black">
                        Generate Image
                        </div>
                    </button>

                    </div>

            </div>
        </div>
    )
}

export default AiAgentChat;