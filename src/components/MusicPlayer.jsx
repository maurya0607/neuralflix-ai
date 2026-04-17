import React, { useState, useEffect } from 'react';
import { FiVolume2, FiVolumeX, FiPlay } from 'react-icons/fi';

export default function MusicPlayer({ isAutoPlayRequired = false }) {
  const [isMuted, setIsMuted] = useState(false);
  const [audio] = useState(new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3'));
  const [audioStarted, setAudioStarted] = useState(!isAutoPlayRequired);

  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.3;
    audio.muted = isMuted;
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio, isMuted]);

  useEffect(() => {
    if (audioStarted) {
      audio.play().catch(e => console.log('Audio playback prevented by browser'));
    }
  }, [audioStarted, audio]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const startAudio = () => {
    setAudioStarted(true);
  };

  return (
    <>
      {!audioStarted && (
        <button 
          onClick={startAudio}
          className="mb-8 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center gap-2 backdrop-blur-md hover:scale-105"
        >
          <FiPlay className="w-4 h-4" /> Start Cinematic Experience
        </button>
      )}

      {audioStarted && (
        <button 
          onClick={toggleMute}
          className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all backdrop-blur-md z-50 text-white"
        >
          {isMuted ? <FiVolumeX className="w-6 h-6 text-gray-400" /> : <FiVolume2 className="w-6 h-6" />}
        </button>
      )}
    </>
  );
}
