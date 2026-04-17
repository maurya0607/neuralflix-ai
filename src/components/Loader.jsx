import React from 'react';

export default function Loader({ text }) {
  return (
    <div className="w-full flex-col flex items-center justify-center p-12 min-h-[400px] relative">
      {/* Hackathon Level Neural Network SVG Animation */}
      <div className="relative w-32 h-32 mb-8">
        {/* Glowing aura */}
        <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-20 animate-pulse"></div>
        
        {/* Rotating outer rings */}
        <svg className="absolute w-full h-full animate-[spin_4s_linear_infinite]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(168,85,247,0.3)" strokeWidth="1" strokeDasharray="10 5" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(168,85,247,0.5)" strokeWidth="2" strokeDasharray="30 10 10 5" />
        </svg>

        <svg className="absolute w-full h-full animate-[spin_3s_linear_reverse_infinite]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(236,72,153,0.4)" strokeWidth="1.5" strokeDasharray="20 10" />
        </svg>

        {/* Neural nodes connecting */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-lg animate-[pulse_1.5s_ease-in-out_infinite] shadow-[0_0_20px_#a855f7] transform rotate-45 flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
          </div>
        </div>
      </div>

      <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2 tracking-widest uppercase">
        Processing Request
      </h3>
      <p className="text-gray-400 font-mono text-xs tracking-widest animate-pulse">
        {text || "INITIALIZING NEURAL PATHWAYS..."}
      </p>

      {/* Fake progress bar */}
      <div className="w-64 h-1 mt-6 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-1/2 animate-[pulse_1s_ease-in-out_infinite]"></div>
      </div>
    </div>
  );
}
