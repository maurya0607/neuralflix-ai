import React, { useState } from 'react';
import { FiStar, FiCpu, FiUser, FiTarget, FiZap, FiChevronRight } from 'react-icons/fi';
import Loader from './Loader';

export default function InputForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    name: '',
    dream: '',
    struggles: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.dream && formData.struggles) {
      onSubmit(formData);
    }
  };

  if (isLoading) {
    return <Loader text="Neural Engine is composing your legacy..." />;
  }

  return (
    <div className="w-full max-w-xl mx-auto relative group">
      
      {/* Glow effect behind the form */}
      <div className="absolute inset-0 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-indigo-600/20 transition-all duration-1000"></div>
      
      <div className="relative p-10 rounded-[2.5rem] bg-black/40 backdrop-blur-3xl border border-white/5 shadow-2xl">
        
        {/* Branding Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="p-3.5 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 shadow-lg mb-6">
            <FiCpu className="w-7 h-7 text-indigo-400" />
          </div>
          <h2 className="text-3xl font-medium tracking-tight text-white mb-2">VishwaNova <span className="text-gray-500">Suite</span></h2>
          <div className="h-[1px] w-12 bg-indigo-500/50" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          
          <div className="grid gap-10">
            {/* Protagonist Name */}
            <div className="relative group/field">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 mb-3 block ml-1 transition-colors group-focus-within/field:text-indigo-400">
                Protagonist Name
              </label>
              <div className="flex items-center gap-4 bg-white/5 border border-white/5 group-focus-within/field:border-indigo-500/30 rounded-2xl px-5 py-4 transition-all hover:bg-white/[0.07]">
                <FiUser className="text-gray-600 group-focus-within/field:text-indigo-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="The legend's name"
                  required
                  className="bg-transparent border-none outline-none text-white text-sm w-full font-medium placeholder:text-gray-700"
                />
              </div>
            </div>

            {/* Dream */}
            <div className="relative group/field">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 mb-3 block ml-1 transition-colors group-focus-within/field:text-purple-400">
                Core Ambition
              </label>
              <div className="flex items-center gap-4 bg-white/5 border border-white/5 group-focus-within/field:border-purple-500/30 rounded-2xl px-5 py-4 transition-all hover:bg-white/[0.07]">
                <FiTarget className="text-gray-600 group-focus-within/field:text-purple-400" />
                <input
                  type="text"
                  name="dream"
                  value={formData.dream}
                  onChange={handleChange}
                  placeholder="Their ultimate cinematic goal"
                  required
                  className="bg-transparent border-none outline-none text-white text-sm w-full font-medium placeholder:text-gray-700"
                />
              </div>
            </div>

            {/* Struggles */}
            <div className="relative group/field">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 mb-3 block ml-1 transition-colors group-focus-within/field:text-pink-400">
                Nature of Conflict
              </label>
              <div className="flex gap-4 bg-white/5 border border-white/5 group-focus-within/field:border-pink-500/30 rounded-2xl px-5 py-5 transition-all hover:bg-white/[0.07]">
                <FiZap className="text-gray-600 mt-1 group-focus-within/field:text-pink-400" />
                <textarea
                  name="struggles"
                  value={formData.struggles}
                  onChange={handleChange}
                  placeholder="What forces are aligned against them?"
                  required
                  rows={3}
                  className="bg-transparent border-none outline-none text-white text-sm w-full font-medium placeholder:text-gray-700 resize-none min-h-[80px]"
                />
              </div>
            </div>
          </div>

          {/* Action */}
          <button
            type="submit"
            className="w-full group relative py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.3em] overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          >
            <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <span className="relative z-10 flex items-center justify-center gap-3 transition-colors group-hover:text-white">
              Roll Camera
              <FiChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <p className="text-center text-[9px] uppercase font-black tracking-[0.4em] text-gray-700">
            Powered by VishwaNova Neural Architecture
          </p>

        </form>
      </div>
    </div>
  );
}
