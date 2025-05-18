"use client";

import { useToolStore } from "@/lib/toolStore";
import ScoutlyAICard from "./ScoutlyAICard";
import { ToolRenderer } from "./ToolRenderer";

const AiClient = () => {
  const { activeTool } = useToolStore();
  
  return (
    <div className={`transition-all duration-500 ease-in-out ${
      activeTool ? "flex flex-col md:flex-row justify-center items-stretch gap-6" : "flex justify-center items-center"
    }`}>
      {/* Main AI card - centered when no tool is active, otherwise moved to side */}
      <div className={`transition-all duration-500 ease-in-out flex flex-col h-auto ${
        activeTool
          ? "w-full md:w-1/2 lg:w-2/5"
          : "w-full max-w-2xl"
      }`}>
        <ScoutlyAICard />
      </div>
      
      {/* Tool output area - only shown when a tool is active */}
      {activeTool && (
        <div className="w-full md:w-1/2 lg:w-3/5 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl flex transition-all duration-500 ease-in-out animate-fadeIn">
          <div className="w-full h-full p-2">
            <ToolRenderer />
          </div>
        </div>
      )}
    </div>
  );
}

export default AiClient;