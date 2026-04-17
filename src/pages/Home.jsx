import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import DirectorBrief from '../components/DirectorBrief';
import StoryDisplay from '../components/StoryDisplay';
import { generateProfessionalStory } from '../utils/ai';
import { storyService } from '../services/storyService';
import { FiFilm, FiActivity, FiAward } from 'react-icons/fi';

export default function Home() {
  const [appState, setAppState] = useState('input'); // 'input', 'selection', 'loading', 'story'
  const [formData, setFormData] = useState(null);
  const [story, setStory] = useState('');
  const [error, setError] = useState(null);

  const handleInputSubmit = (data) => {
    setFormData(data);
    setAppState('selection');
  };

  const handleBriefSubmit = async (briefData) => {
    const finalData = { ...formData, ...briefData };
    setAppState('loading');
    try {
      const generatedScript = await generateProfessionalStory(finalData);
      setStory(generatedScript);
      setAppState('story');

      // Silently save to backend
      try {
        await storyService.saveStory(finalData.name, finalData.dream, finalData.struggles, generatedScript);
      } catch (err) {
        console.error("Failed to save story to archive:", err);
      }
      
    } catch (error) {
      console.error(error);
      setError(error.message || "Something went wrong. Please try again.");
      setAppState('input'); // Reset on error
      setTimeout(() => setError(null), 5000); // Clear error after 5s
    }
  };

  const handleReset = () => {
    setStory('');
    setFormData(null);
    setAppState('input');
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 overflow-x-hidden">
      
      {/* Cinematic Background Elements */}
      <div className="fixed top-20 right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse"></div>
      <div className="fixed bottom-0 left-[-10%] w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {error && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-bounce">
            <div className="bg-red-500/10 backdrop-blur-md border border-red-500/20 text-red-400 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest shadow-2xl">
              {error}
            </div>
          </div>
        )}
        
        {['input', 'selection', 'loading'].includes(appState) && (
          <div className="text-center mb-16 animate-fade-in relative transition-all duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-6 mx-auto">
              <FiAward className="w-3 h-3" /> National Hackathon Edition
            </div>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6">
              Rewrite The <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent italic">Ordinary</span>
            </h1>
            <p className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">
              Transform your dreams and struggles into a high-octane cinematic trailer script. 
              VishwaNova AI uses neural narrative structures to build your legacy.
            </p>

            <div className="flex items-center justify-center gap-8 mt-10">
              <div className="flex flex-col items-center gap-1">
                <FiFilm className="text-gray-600 w-5 h-5" />
                <span className="text-[10px] uppercase font-bold text-gray-700 tracking-widest">Cinema Grade</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="flex flex-col items-center gap-1">
                <FiActivity className="text-gray-600 w-5 h-5" />
                <span className="text-[10px] uppercase font-bold text-gray-700 tracking-widest">Realtime Sync</span>
              </div>
            </div>
          </div>
        )}

        <div className={`w-full transition-all duration-700 ${appState === 'story' ? 'max-w-6xl' : appState === 'selection' ? 'max-w-3xl' : 'max-w-xl'}`}>
          {appState === 'input' && (
            <div className="animate-float">
              <InputForm onSubmit={handleInputSubmit} isLoading={false} />
            </div>
          )}

          {appState === 'selection' && (
            <DirectorBrief onSubmit={handleBriefSubmit} />
          )}

          {appState === 'loading' && (
            <div className="scale-105 transition-transform duration-500">
               <div className="flex flex-col items-center justify-center py-20 bg-black/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/5">
                  <div className="animate-spin w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full mb-6"></div>
                  <p className="text-xs font-black uppercase tracking-[0.4em] text-indigo-400">Processing Director's Brief...</p>
               </div>
            </div>
          )}

          {appState === 'story' && (
            <div className="animate-fade-in-up">
              <StoryDisplay story={story} onReset={handleReset} />
            </div>
          )}
        </div>

      </div>

      {/* Decorative Footer Detail */}
      {appState !== 'story' && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 text-gray-800 opacity-50">
          <span className="text-[10px] font-black uppercase tracking-[0.5em]">Scene 001</span>
          <div className="w-20 h-[1px] bg-white/5" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em]">Take 01</span>
        </div>
      )}

    </div>
  );
}
