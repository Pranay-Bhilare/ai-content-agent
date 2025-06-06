type AgentPulseProps = {
    size?: "small" | "medium" | "large";
    color?: "blue";
}

export function AgentPulse({size = "medium", color = "blue"} : AgentPulseProps ){
    const sizeClasses = {
        small : "w-4 h-4",
        medium : "w-12 h-12",
        large : "w-16 h-16"
    }
    const colorClasses = {
        blue : "bg-blue-500 shadow-[0_0_8px_4px_rgba(59,130,246,0.5)"
    }

    return <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse` } />

}   