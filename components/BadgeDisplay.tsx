
import React from 'react';
import { Badge } from '../types';

interface BadgeDisplayProps {
  badge: Badge;
  score: number;
  onContinue: () => void;
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ badge, score, onContinue }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md p-10 rounded-[40px] text-center shadow-2xl animate-in zoom-in-95 duration-500">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-indigo-100 rounded-full scale-150 blur-3xl opacity-50 animate-pulse"></div>
          <div className="relative w-32 h-32 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full mx-auto flex items-center justify-center text-6xl shadow-xl shadow-indigo-500/40">
            {badge.icon}
          </div>
        </div>
        
        <h2 className="text-3xl font-black text-slate-900 mb-2">Modulo Completato!</h2>
        <p className="text-slate-500 font-medium mb-6">Hai ottenuto il badge:</p>
        
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-8">
          <div className="text-indigo-600 font-black text-xl mb-1 uppercase tracking-tight">{badge.name}</div>
          <div className="text-slate-400 text-xs font-bold">{badge.moduleTitle}</div>
        </div>

        <div className="text-4xl font-black text-emerald-500 mb-10">
          +{score} <span className="text-sm text-slate-400 uppercase tracking-widest">Punti</span>
        </div>

        <button
          onClick={onContinue}
          className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 hover:scale-105 transition-all shadow-lg shadow-indigo-600/30"
        >
          Prosegui il Corso
        </button>
      </div>
    </div>
  );
};

export default BadgeDisplay;
