"use client";

export default function SessionToggleButton ({
  handleConnectClick,
  isSessionActive,
}: {
  handleConnectClick: () => void;
  isSessionActive: boolean;
}) {
  return <div className="absolute top-4 right-4 flex gap-2">
  <button
    onClick={handleConnectClick}
    className={`px-4 py-2 rounded-lg font-medium ${
      isSessionActive 
        ? "bg-red-500 hover:bg-red-600" 
        : "bg-blue-500 hover:bg-blue-600"
    } text-white transition-colors`}
  >
    {isSessionActive ? "Stop Session" : "Start Session"}
  </button>
</div>
}