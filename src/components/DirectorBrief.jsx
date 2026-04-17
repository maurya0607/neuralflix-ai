import React, { useState } from 'react';
import { FiFilm, FiWind, FiZap, FiChevronRight } from 'react-icons/fi';

const genres = ['Cyberpunk', 'Epic Fantasy', 'Crime Noir', 'Space Opera', 'Psychological Thriller', 'Historical Drama'];
const moods = ['Dark & Gritty', 'Inspiring', 'Intense', 'Melancholic', 'Suspenseful', 'High-Octane'];

export default function DirectorBrief({ onSubmit }) {
  const [genre, setGenre] = useState('');
  const [mood, setMood] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (genre && mood) {
      onSubmit({ genre, mood });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="relative p-10 rounded-[2.5rem] bg-black/40 backdrop-blur-3xl border border-white/5 shadow-2xl">
        
        <div className="flex flex-col items-center mb-12">
          <div className="p-3.5 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 shadow-lg mb-6">
            <FiFilm className="w-7 h-7 text-indigo-400" />
          </div>
          <h2 className="text-3xl font-medium tracking-tight text-white mb-2">Director's Brief</h2>
          <p className="text-gray-500 text-xs uppercase tracking-widest">Select the cinematic vision</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* Genre Selection */}
          <div className="space-y-4">
            <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500 block ml-1 text-center">Cinematic Genre</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {genres.map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGenre(g)}
                  className={`px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${genre === g ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Mood Selection */}
          <div className="space-y-4">
            <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500 block ml-1 text-center">Narrative Mood</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {moods.map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  className={`px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${mood === m ? 'bg-purple-600 border-purple-500 text-white shadow-lg' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={!genre || !mood}
              className="w-full group relative py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.3em] overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30"
            >
              <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <span className="relative z-10 flex items-center justify-center gap-3 transition-colors group-hover:text-white">
                Finalize Script Initialization
                <FiChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
