
import React, { useState } from 'react';
import { AGILE_NUTSHELL_DATA, NutshellItem } from '../constants';

const AgileNutshell: React.FC = () => {
  const [selected, setSelected] = useState<NutshellItem | null>(null);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">Agile in a Nutshell</h2>
        <p className="text-slate-500 font-medium">Una panoramica visiva delle differenze chiave tra il mondo Waterfall e l'approccio Agile MetàHodòs. Seleziona una categoria per approfondire.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {AGILE_NUTSHELL_DATA.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item)}
            className={`group relative p-6 rounded-[32px] border-2 transition-all flex flex-col items-center justify-center text-center overflow-hidden ${
              selected?.id === item.id 
                ? 'bg-indigo-600 border-indigo-400 text-white shadow-xl scale-105 z-10' 
                : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-lg'
            }`}
          >
            <span className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-500">{item.icon}</span>
            <span className={`text-xs font-black uppercase tracking-widest ${selected?.id === item.id ? 'text-indigo-100' : 'text-slate-900'}`}>{item.title}</span>
            {selected?.id === item.id && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white/20 rounded-full animate-ping"></div>
            )}
          </button>
        ))}
      </div>

      {selected ? (
        <div className="mt-12 bg-white p-10 rounded-[48px] shadow-2xl border border-slate-100 animate-in slide-in-from-bottom-8 duration-500">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-6xl">{selected.icon}</span>
                <h3 className="text-4xl font-black text-slate-900">{selected.title}</h3>
              </div>
              
              <p className="text-xl text-slate-600 leading-relaxed font-medium italic">
                "{selected.description}"
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 p-8 rounded-[32px] border-2 border-emerald-100 relative overflow-hidden group">
                  <span className="absolute -top-4 -right-4 text-8xl opacity-10 font-black group-hover:rotate-12 transition-transform">✓</span>
                  <h4 className="text-emerald-700 font-black text-xs uppercase tracking-[0.2em] mb-3">Agile MetàHodòs</h4>
                  <p className="text-emerald-900 text-xl font-bold leading-tight">{selected.agile}</p>
                </div>
                <div className="bg-red-50 p-8 rounded-[32px] border-2 border-red-100 relative overflow-hidden group">
                  <span className="absolute -top-4 -right-4 text-8xl opacity-10 font-black group-hover:-rotate-12 transition-transform">✕</span>
                  <h4 className="text-red-700 font-black text-xs uppercase tracking-[0.2em] mb-3">Waterfall Tradizionale</h4>
                  <p className="text-red-900 text-xl font-bold leading-tight">{selected.waterfall}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-12 p-20 border-4 border-dashed border-slate-100 rounded-[48px] flex flex-col items-center justify-center text-slate-300">
            <div className="text-6xl mb-4 animate-bounce">👆</div>
            <p className="font-black uppercase tracking-widest">Scegli una categoria sopra per iniziare il confronto</p>
        </div>
      )}
    </div>
  );
};

export default AgileNutshell;
