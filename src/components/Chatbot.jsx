import React, { useState, useRef, useEffect } from 'react';

// Chatbot now calls backend API (/api/chat) instead of local rule set.
// Fallback logic (optional) could be added if server unreachable.

export default function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hi! Ask me about yield, weather, disease, fertilizer or rainfall.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  useEffect(()=>{ bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); },[messages]);

  const send = () => {
    const trimmed = input.trim();
    if(!trimmed) return;
    const userMsg = { role: 'user', content: trimmed };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    setError(null);
  const base = import.meta.env.VITE_API_BASE || '';
  fetch(base + '/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: trimmed })
    })
      .then(async r => {
        const text = await r.text();
        let data;
        try { data = text ? JSON.parse(text) : {}; } catch { throw new Error('Bad JSON from server'); }
        if(!r.ok) throw new Error(data.error || 'Request failed');
        return data;
      })
      .then(data => {
        if(data.error) throw new Error(data.error);
        const botMsg = { role: 'bot', content: data.reply };
        setMessages(m => [...m, botMsg]);
      })
      .catch(err => {
        setError(err.message || 'Error');
        const botMsg = { role: 'bot', content: 'Sorry, server error. Try again later.' };
        setMessages(m => [...m, botMsg]);
      })
      .finally(()=> setLoading(false));
  };
  const handleKey = (e) => { if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); send(); }}

  return (
    <div className="flex flex-col w-80 h-96 rounded-xl bg-gray-900/95 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden animate-fade-in">
      <div className="h-11 shrink-0 px-4 flex items-center justify-between border-b border-white/10 bg-white/5">
        <span className="text-xs font-semibold tracking-wide text-emerald-200">Agri Chat</span>
        <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/10 text-white/70">
          <svg viewBox="0 0 24 24" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M6 6l12 12M6 18 18 6"/></svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 text-[12px] leading-relaxed">
        {messages.map((m,i)=>(
          <div key={i} className={m.role==='user' ? 'text-right' : 'text-left'}>
            <div className={`inline-block px-3 py-2 rounded-lg max-w-[85%] whitespace-pre-wrap ${m.role==='user' ? 'bg-emerald-600/70 text-white' : 'bg-white/10 text-emerald-100/90'}`}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div className='text-left'>
            <div className='inline-block px-3 py-2 rounded-lg bg-white/10 text-emerald-100/70 text-[11px] animate-pulse'>Thinking...</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="p-2 border-t border-white/10 bg-white/5">
        <textarea
          rows={2}
          value={input}
          onChange={e=> setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask something..."
          className="w-full resize-none rounded-md bg-gray-800/70 border border-white/10 px-2 py-2 text-[12px] focus:outline-none focus:ring-2 focus:ring-emerald-400/40 text-white placeholder:text-white/30"
        />
        <div className="pt-1 flex justify-between items-center">
          {error && <span className='text-[10px] text-red-400 pr-2'>{error}</span>}
          <button onClick={send} className="px-4 py-1.5 rounded-md text-[11px] font-semibold bg-emerald-500 hover:bg-emerald-600 text-white shadow shadow-emerald-900/40 disabled:opacity-40" disabled={!input.trim() || loading}>{loading ? '...' : 'Send'}</button>
        </div>
      </div>
    </div>
  );
}
