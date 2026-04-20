import React, { useEffect, useState } from 'react';
import { storyService } from '../services/storyService';
import { useAuth } from '../context/AuthContext';
import ScriptModal from '../components/ScriptModal';
import { FiClock, FiTrash2, FiDownload, FiPlus, FiFilm } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => { fetchStories(); }, []);

  const fetchStories = async () => {
    try {
      const data = await storyService.getMyStories();
      setStories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this script?")) {
      await storyService.deleteStory(id);
      setStories(stories.filter(s => s._id !== id));
    }
  };

  const handleDownload = (story) => {
    const element = document.createElement("a");
    const file = new Blob([story.generatedScript], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${story.protagonistName.replace(' ', '_')}_Script.txt`;
    document.body.appendChild(element);
    element.click();
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0f' }}>
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-purple-400 text-sm tracking-widest">LOADING ARCHIVE...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen px-6 py-8" style={{ background: '#0a0a0f' }}>
      <div className="max-w-7xl mx-auto">

        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-medium bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent tracking-wide mb-2">
            Director's Archive
          </h1>
          <p className="text-gray-600 text-sm">
            Welcome back, <span className="text-gray-400">{user?.name}</span>. Here are your saved cinematic concepts.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { label: 'Total Scripts', value: stories.length, color: 'text-purple-300' },
            { label: 'This Month', value: stories.filter(s => new Date(s.createdAt).getMonth() === new Date().getMonth()).length, color: 'text-pink-300' },
            { label: 'Downloaded', value: '—', color: 'text-blue-300' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)' }}>
              <p className="text-xs text-gray-600 uppercase tracking-widest mb-2">{stat.label}</p>
              <p className={`text-3xl font-medium ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs text-gray-600 uppercase tracking-widest">Saved Scripts</p>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-xs text-purple-300 rounded-full px-4 py-2 transition-all"
              style={{ background: 'rgba(206,147,216,0.1)', border: '0.5px solid rgba(206,147,216,0.2)' }}
            >
              <FiPlus size={12} /> New Script
            </button>
          </div>
  
          {/* Empty State */}
          {stories.length === 0 ? (
            <div className="text-center py-20 rounded-3xl" style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px dashed rgba(255,255,255,0.08)' }}>
              <FiFilm className="mx-auto mb-4 text-gray-700" size={36} />
              <p className="text-gray-600 mb-5">No scripts in the archive yet.</p>
              <button onClick={() => navigate('/')} className="text-sm text-purple-300 border border-purple-500/20 px-6 py-2 rounded-full hover:bg-purple-500/10 transition-all">
                Generate your first script
              </button>
            </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {stories.map(story => (
              <div
                key={story._id}
                onClick ={() => setSelectedStory(story)}
                className="group flex flex-col rounded-3xl p-5 transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '0.5px solid rgba(255,255,255,0.08)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.border = '0.5px solid rgba(206,147,216,0.3)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.045)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.border = '0.5px solid rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                {/* Card Top */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-base font-medium text-gray-200 capitalize">
                    {story.protagonistName}'s Journey
                  </h3>
                  <span className="flex items-center gap-1 text-xs text-gray-600 rounded-full px-2 py-1" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    {/* <FiClock size={10} /> {new Date(story.createdAt).toLocaleDateString()} */}
                    <FiClock size={10} /> {new Date(story.createdAt).toLocaleDateString("en-GB")}
                  </span>
                </div>

                {/* Tags + Meta */}
                <div className="space-y-2 mb-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider rounded px-2 py-0.5 mr-2" style={{ background: 'rgba(244,143,177,0.1)', color: '#f48fb1', border: '0.5px solid rgba(244,143,177,0.2)' }}>Dream</span>
                    <span className="text-xs text-gray-600 line-clamp-1">{story.dream}</span>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider rounded px-2 py-0.5 mr-2" style={{ background: 'rgba(144,202,249,0.1)', color: '#90caf9', border: '0.5px solid rgba(144,202,249,0.15)' }}>Conflict</span>
                    <span className="text-xs text-gray-600 line-clamp-1">{story.struggles}</span>
                  </div>
                </div>

                {/* Script Preview */}
                <div className="flex-1 relative rounded-xl p-3 mb-4" style={{ background: 'rgba(0,0,0,0.4)', border: '0.5px solid rgba(255,255,255,0.05)' }}>
                  <p className="text-xs text-gray-500 italic leading-relaxed line-clamp-4">{story.generatedScript}</p>
                  <div className="absolute inset-x-0 bottom-0 h-8 rounded-b-xl" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-3 mt-auto" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
                  <button
                    onClick={() => handleDownload(story)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                    style={{ background: 'rgba(206,147,216,0.1)', color: '#ce93d8' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(206,147,216,0.25)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(206,147,216,0.1)'}
                    title="Download"
                  >
                    <FiDownload size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(story._id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                    style={{ background: 'rgba(239,83,80,0.1)', color: '#ef5350' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,83,80,0.25)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,83,80,0.1)'}
                    title="Delete"
                  >
                    <FiTrash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedStory && (
        <ScriptModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </div>
  );
}