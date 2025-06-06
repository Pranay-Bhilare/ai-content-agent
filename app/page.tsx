import { AgentPulse } from "@/components/AgentPulse";
import { Header } from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-10 text-center mb-12">
        
            <AgentPulse size="large" color="blue" />
          
            <h1 className="text-2xl md:text-6xl font-bold text-gray-900 mb-6">
              Meet Your Personal{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                AI Content Agent
              </span>
            </h1>

          </div>
        </div>
      </section>
    </div>
    
    // Hero Section 
    // Features Section
    // Hopw it works section 
    // Footer section 


  );
}
