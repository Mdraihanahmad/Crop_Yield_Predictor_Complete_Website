import React, { useEffect } from 'react';

export function Toast({ t, onUndo, onClose }) {
  useEffect(()=>{ const id = setTimeout(()=> onClose(t.id), t.duration || 4000); return ()=> clearTimeout(id); },[t, onClose]);
  return (
    <div className="pointer-events-auto w-full max-w-sm rounded-lg border border-white/10 bg-gray-900/90 backdrop-blur-xl p-4 shadow-xl shadow-black/40 flex flex-col gap-2 text-[13px] animate-fade-in">
      <div className="font-medium text-emerald-200/90">{t.title}</div>
      {t.message && <div className="text-emerald-100/70 leading-snug">{t.message}</div>}
      <div className="flex gap-3 justify-end pt-1">
        {onUndo && t.canUndo && (
          <button onClick={()=> onUndo(t)} className="text-xs font-semibold px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white transition">Undo</button>
        )}
        <button onClick={()=> onClose(t.id)} className="text-xs font-medium px-3 py-1 rounded-md bg-white/10 hover:bg-white/15 text-emerald-100">Close</button>
      </div>
    </div>
  );
}

export default function Toaster({ toasts, onUndo, remove }) {
  return (
    <div className="fixed bottom-6 left-6 z-[400] flex flex-col gap-3 w-[320px] pointer-events-none">
      {toasts.map(t => <Toast key={t.id} t={t} onUndo={onUndo} onClose={remove} />)}
    </div>
  );
}
