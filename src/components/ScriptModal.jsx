import React, { useState, useRef, useEffect } from 'react';
import { FiX, FiSend, FiDownload, FiCopy, FiCheck } from 'react-icons/fi';
import { chatWithScript } from '../utils/ai';

export default function ScriptModal({ story, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Namaste! Main is script ke baare mein aapki madad kar sakta hoon. Kya improve karna chahte ho?`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const reply = await chatWithScript(story.generatedScript, [...messages, userMsg]);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message || 'Kuch error aaya. Dobara try karo.'}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(story.generatedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const el = document.createElement('a');
    const file = new Blob([story.generatedScript], { type: 'text/plain' });
    el.href = URL.createObjectURL(file);
    el.download = `${story.protagonistName}_Script.txt`;
    document.body.appendChild(el);
    el.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-5xl h-[90vh] flex flex-col rounded-3xl overflow-hidden"
        style={{ background: '#0f0f18', border: '0.5px solid rgba(255,255,255,0.1)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.07)' }}>
          <div>
            <h2 className="text-lg font-medium text-white capitalize">{story.protagonistName}'s Journey</h2>
            <p className="text-xs text-gray-600 mt-0.5">{new Date(story.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all" style={{ background: 'rgba(255,255,255,0.05)', color: '#aaa' }}>
              {copied ? <FiCheck size={12} /> : <FiCopy size={12} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button onClick={handleDownload} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all" style={{ background: 'rgba(206,147,216,0.1)', color: '#ce93d8' }}>
              <FiDownload size={12} /> Download
            </button>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full transition-all" style={{ background: 'rgba(255,255,255,0.05)', color: '#888' }}>
              <FiX size={16} />
            </button>
          </div>
        </div>

        {/* Body — Script + Chat */}
        <div className="flex flex-1 flex-col md:flex-row overflow-hidden">

          {/* Left: Full Script */}
          <div className="w-full md:w-1/2 overflow-y-auto p-6 border-b md:border-b-0 md:border-r" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-4">Generated Script</p>
            <div className="space-y-2">
              <div className="flex gap-2 flex-wrap mb-4">
                <span className="text-xs px-2 py-1 rounded" style={{ background: 'rgba(244,143,177,0.1)', color: '#f48fb1', border: '0.5px solid rgba(244,143,177,0.2)' }}>
                  Dream: {story.dream}
                </span>
                <span className="text-xs px-2 py-1 rounded" style={{ background: 'rgba(144,202,249,0.1)', color: '#90caf9', border: '0.5px solid rgba(144,202,249,0.15)' }}>
                  Conflict: {story.struggles}
                </span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{story.generatedScript}</p>
            </div>
          </div>

          {/* Right: Chat */}
          <div className="w-full md:w-1/2 flex flex-col h-[40vh] md:h-auto">
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className="max-w-xs text-sm px-4 py-3 rounded-2xl leading-relaxed"
                    style={msg.role === 'user'
                      ? { background: 'rgba(206,147,216,0.15)', color: '#e0d0f0', borderBottomRightRadius: '4px' }
                      : { background: 'rgba(255,255,255,0.05)', color: '#ccc', borderBottomLeftRadius: '4px' }
                    }
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl text-sm" style={{ background: 'rgba(255,255,255,0.05)', color: '#666' }}>
                    <span className="animate-pulse">Soch raha hoon...</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4" style={{ borderTop: '0.5px solid rgba(255,255,255,0.07)' }}>
              <div className="flex gap-2 items-end">
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder="Is script ko improve karo... (Enter = send)"
                  rows={2}
                  className="flex-1 resize-none text-sm rounded-2xl px-4 py-3 outline-none"
                  style={{ background: 'rgba(255,255,255,0.05)', color: '#ddd', border: '0.5px solid rgba(255,255,255,0.1)', lineHeight: '1.5' }}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0"
                  style={{ background: input.trim() ? 'rgba(206,147,216,0.8)' : 'rgba(255,255,255,0.05)', color: input.trim() ? '#fff' : '#444' }}
                >
                  <FiSend size={14} />
                </button>
              </div>
              <p className="text-xs text-gray-700 mt-2 text-center">Shift+Enter = new line • Enter = send</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}