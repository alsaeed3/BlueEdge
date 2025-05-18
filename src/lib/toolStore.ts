import { create } from 'zustand';

interface ToolState {
  activeTool: string | null;
  toolParams: Record<string, any> | null;
  setActiveTool: (toolName: string | null, params?: Record<string, any> | null) => void;
  resetActiveTool: () => void;
}

export const useToolStore = create<ToolState>((set) => ({
  activeTool: null,
  toolParams: null,
  setActiveTool: (toolName, params = null) => set({ activeTool: toolName, toolParams: params }),
  resetActiveTool: () => set({ activeTool: null, toolParams: null }),
}));