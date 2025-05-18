"use client";

import { useToolStore } from "@/lib/toolStore";
import ScoutlyAICard from "./ScoutlyAICard";
import { ToolRenderer } from "./ToolRenderer";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AiClient = () => {
  const { activeTool } = useToolStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  
  // Reset drawer to open state when no tool is active
  useEffect(() => {
    if (!activeTool) {
      setIsDrawerOpen(true);
    }
  }, [activeTool]);
  
  return (
    <div className={`transition-all duration-500 ease-in-out ${
      activeTool ? "flex flex-col md:flex-row justify-center items-stretch gap-6" : "flex justify-center items-center"
    }`}>
      {/* Drawer toggle button - only visible when a tool is active */}
      {activeTool && (
        <button 
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className={`fixed top-[calc(50%)] ${isDrawerOpen ? 'left-[calc(33%-1.25rem)]' : 'left-[2.5rem]'} z-50 flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/70 text-white border border-white/10 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-purple-800/70 cursor-pointer`}
          aria-label={isDrawerOpen ? "Collapse AI Chat" : "Expand AI Chat"}
        >
          {isDrawerOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      )}
      
      {/* Main AI card - centered when no tool is active, drawer when tool is active */}
      <div className={`transition-all duration-500 ease-in-out flex flex-col h-auto ${
        activeTool 
          ? `${isDrawerOpen 
              ? 'w-full md:w-1/3 lg:w-1/3' 
              : 'w-12 opacity-30 hover:opacity-100'} fixed left-5 top-0 h-full z-40 p-4 ${
                isDrawerOpen ? 'translate-x-0' : '-translate-x-[calc(100%-2.5rem)]'
              } bg-transparent shadow-xl`
          : 'w-full max-w-2xl'
      }`}>
        <div className={`h-full w-full overflow-auto ${activeTool ? 'pt-16 pb-4 pr-2' : ''}`}>
          <ScoutlyAICard />
        </div>
      </div>
      
      {/* Tool output area - expands when drawer is collapsed */}
      {activeTool && (
        <div className={`w-full transition-all duration-500 ease-in-out ${
          isDrawerOpen ? 'md:ml-[calc(33%+1rem)]' : 'md:ml-10'
        }`}>
          <div className="w-full bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl flex transition-all duration-500 ease-in-out animate-fadeIn">
            <div className="w-full h-full p-2">
              <ToolRenderer />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AiClient;