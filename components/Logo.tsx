
import React from 'react';

const Logo: React.FC<{ light?: boolean; compact?: boolean }> = ({ light = false, compact = false }) => {
  return (
    <div className={`flex flex-col ${compact ? 'items-start' : 'items-center'} gap-2 select-none`}>
      {/* Tre pallini MetàHodòs */}
      <div className="flex gap-4 mb-1">
        <div className="w-4 h-4 rounded-full bg-[#ef4444] shadow-sm"></div>
        <div className="w-4 h-4 rounded-full bg-[#fbbf24] shadow-sm"></div>
        <div className="w-4 h-4 rounded-full bg-[#22c55e] shadow-sm"></div>
      </div>
      
      {/* Testo Principale */}
      <div className={`flex flex-col items-center leading-none font-sans ${light ? 'text-white' : 'text-[#333]'}`}>
        <span className="text-4xl font-light tracking-[0.2em]">METÀ</span>
        <span className="text-4xl font-light tracking-[0.2em] mt-1">HODÒS</span>
      </div>

      {/* Sottotitolo impilato se non compatto */}
      {!compact && (
        <div className={`mt-2 flex flex-col items-center gap-1 text-[8px] font-bold uppercase tracking-[0.5em] ${light ? 'text-slate-400' : 'text-slate-400'}`}>
          <span>PERSONE • AGILITÀ • RISULTATI</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
