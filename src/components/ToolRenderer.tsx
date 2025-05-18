"use client"

import React from 'react';
import { useToolStore } from '../lib/toolStore';
import { motion } from 'framer-motion';

// Tool-specific components
const BackgroundColorTool = ({ color }: { color: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-purple-500/30 backdrop-blur-sm w-full"
  >
    <h3 className="text-xl font-bold mb-4 text-purple-300">Function Called</h3>
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-md shadow-inner" style={{ backgroundColor: color }}></div>
      <span className="font-mono text-sm bg-black/30 px-3 py-1 rounded">{color}</span>
    </div>
  </motion.div>
);

const TextColorTool = ({ color }: { color: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-purple-500/30 backdrop-blur-sm"
  >
    <h3 className="text-xl font-bold mb-4 text-purple-300">Text Color Changed</h3>
    <div className="flex items-center gap-3">
      <span className="text-xl font-medium" style={{ color }}>Sample Text</span>
      <span className="font-mono text-sm bg-black/30 px-3 py-1 rounded">{color}</span>
    </div>
  </motion.div>
);

const ShowFingersTool = ({ numberOfFingers }: { numberOfFingers: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-purple-500/30 backdrop-blur-sm"
  >
    <h3 className="text-xl font-bold mb-4 text-purple-300">Robot Hand</h3>
    <p className="mb-4 text-slate-300">Showing {numberOfFingers} finger{numberOfFingers !== 1 ? 's' : ''}</p>
    <div className="flex justify-center mt-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ 
            height: i < numberOfFingers ? 80 : 40,
            transition: { delay: i * 0.1, duration: 0.3 }
          }}
          className={`w-8 h-20 mx-1.5 rounded-t-full shadow-lg ${
            i < numberOfFingers ? 'bg-gradient-to-b from-blue-400 to-purple-600' : 'bg-slate-700'
          }`}
        />
      ))}
    </div>
  </motion.div>
);

const GetPageHTMLTool = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-purple-500/30 backdrop-blur-sm"
  >
    <h3 className="text-xl font-bold mb-4 text-purple-300">Page HTML Retrieved</h3>
    <div className="flex flex-col">
      <div className="bg-black/30 p-4 rounded-md">
        <code className="text-green-300 text-sm">HTML content retrieved successfully</code>
      </div>
      <p className="mt-3 text-slate-300 text-sm">The complete HTML structure of this page has been extracted.</p>
    </div>
  </motion.div>
);

export const ToolRenderer = () => {
  const { activeTool, toolParams } = useToolStore();

  switch (activeTool) {
    case 'changeBackgroundColor':
      return <BackgroundColorTool color={toolParams?.color} />;
    case 'changeTextColor':
      return <TextColorTool color={toolParams?.color} />;
    case 'showFingers':
      return <ShowFingersTool numberOfFingers={toolParams?.numberOfFingers} />;
    case 'getPageHTML':
      return <GetPageHTMLTool />;
    default:
      return null;
  }
};