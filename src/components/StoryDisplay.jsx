import React, { useState, useEffect } from 'react';
import { FiRefreshCcw, FiDownload, FiVolume2, FiVolumeX, FiPlus, FiImage, FiZap } from 'react-icons/fi';
import MusicPlayer from './MusicPlayer';
import { useTypewriter } from '../hooks/useTypewriter';
import { API_BASE_URL } from '../config';


export default function StoryDisplay({ story, onReset }) {
  const { displayedText, isComplete } = useTypewriter(story, 35);
  const [narratorEnabled, setNarratorEnabled] = useState(false);
  const [synth, setSynth] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSynth(window.speechSynthesis);
    }
    return () => {
      if (synth) synth.cancel();
    };
  }, []);

  const [visualUrl, setVisualUrl] = useState('');
  const [visualLoading, setVisualLoading] = useState(false);

  useEffect(() => {
    if (isComplete && narratorEnabled && synth) {
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(story);
      utterance.rate = 0.9;
      utterance.pitch = 0.8;
      
      const voices = synth.getVoices();
      const preferredVoice = voices.find(v => v.name.includes("Google UK English Male") || v.name.includes("Daniel"));
      if(preferredVoice) utterance.voice = preferredVoice;

      synth.speak(utterance);
    }
    return () => {
      if (synth) synth.cancel();
    }
  }, [isComplete, narratorEnabled]);

  const handleVisualize = async () => {
    setVisualLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/ai/visualize-prompt`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ story })
      });
      const data = await response.json();
      const prompt = data.imagePrompt;
      // Using Pollinations AI for free cinematic visuals
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + ", cinematic lighting, hyper-realistic, 8k, movie poster style")}?width=1080&height=608&nologo=true`;
      setVisualUrl(imageUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setVisualLoading(false);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([story], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "VishwaNova_Cinematic_Script.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center py-10">
      
      <MusicPlayer isAutoPlayRequired={false} />

      <div className="w-full relative bg-black/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 md:p-16 min-h-[500px] shadow-2xl flex flex-col z-10 text-left overflow-hidden group">
        
        {/* Cinematic Scanlines */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-10"></div>
        
        {/* Header decoration */}
        <div className="flex justify-between items-center mb-10 text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">
          <span>Neural Output : 01</span>
          <div className="flex items-center gap-2 text-indigo-500/50">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            VishwaNova OS
          </div>
        </div>

        <div className="flex-1 overflow-y-auto w-full relative z-20 scrollbar-hide">
          <p className="text-xl md:text-3xl leading-[1.8] text-white/90 font-medium whitespace-pre-wrap tracking-tight" style={{ fontFamily: 'var(--font-serif, serif)' }}>
            {displayedText}
            {!isComplete && (
              <span className="animate-pulse inline-block w-1.5 h-6 md:h-8 bg-indigo-500 ml-2 align-middle"></span>
            )}
          </p>
        </div>

        {/* Visual Storyboard Frame */}
        {(visualUrl || visualLoading) && (
          <div className="mt-12 relative rounded-2xl overflow-hidden border border-white/10 group/visual animate-fade-in">
            {visualLoading ? (
              <div className="aspect-video bg-white/5 flex flex-col items-center justify-center gap-4">
                <FiZap className="w-8 h-8 text-indigo-400 animate-bounce" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">Rendering Neural Frame...</p>
              </div>
            ) : (
              <>
                <img src={visualUrl} alt="Cinematic Visual" className="w-full aspect-video object-cover transition-transform duration-1000 group-hover/visual:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Neural Storyboard // Frame 01</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className={`mt-16 flex flex-col items-center w-full transition-all duration-1000 ${isComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <div className="flex flex-wrap items-center justify-center gap-6">
          {/* Narrator Toggle */}
          <button 
            onClick={() => {
              if (narratorEnabled && synth) synth.cancel();
              setNarratorEnabled(!narratorEnabled);
            }}
            className={`flex items-center gap-3 px-6 py-3 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] transition-all ${narratorEnabled ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10'}`}
          >
            {narratorEnabled ? <><FiVolume2 className="w-4 h-4 animate-pulse" /> AI Voice On</> : <><FiVolumeX className="w-4 h-4" /> Voice Off</>}
          </button>

          <button
            onClick={handleVisualize}
            disabled={!isComplete || visualLoading}
            className="px-10 py-4 rounded-full bg-indigo-600 text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 hover:bg-indigo-500 hover:scale-105 active:scale-95 shadow-xl disabled:opacity-50"
          >
            {visualLoading ? <FiRefreshCcw className="w-4 h-4 animate-spin" /> : <FiImage className="w-4 h-4" />}
            Visualize Vision
          </button>

          <button
            onClick={handleDownload}
            className="px-10 py-4 rounded-full bg-white/10 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 hover:bg-white/20 hover:scale-105 active:scale-95 shadow-xl"
          >
            <FiDownload className="w-4 h-4" />
            Archive Script
          </button>

          <button
            onClick={onReset}
            className="px-10 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
          >
            <FiPlus className="w-4 h-4" />
            New Scene
          </button>
        </div>

        <div className="mt-12 flex items-center gap-4 opacity-30">
          <div className="w-12 h-[1px] bg-white/20" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">End of Sequence</span>
          <div className="w-12 h-[1px] bg-white/20" />
        </div>
      </div>

    </div>
  );
}
