
import React from 'react';
import { Team, Badge, PillarType } from '../types';
import Logo from './Logo';

interface ExportReportProps {
  team: Team;
  role: string;
  onClose: () => void;
}

const ExportReport: React.FC<ExportReportProps> = ({ team, role, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white md:bg-slate-900/50 backdrop-blur-md overflow-y-auto p-4 md:p-12 no-print">
      <div className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-2xl overflow-hidden print:shadow-none print:rounded-none">
        {/* Intestazione Report */}
        <div className="bg-slate-900 p-12 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
          <div className="relative z-10 space-y-6">
            <Logo light />
            <div className="space-y-2">
              <h2 className="text-4xl font-black uppercase tracking-tight">Report di Fine Corso</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Percorso Specialistico: {role}</p>
            </div>
          </div>
        </div>

        {/* Corpo del Report */}
        <div className="p-12 space-y-12 bg-white">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Dettagli Team</label>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <div className="text-3xl font-black text-slate-900 mb-1">{team.name}</div>
                <div className="text-indigo-600 font-black text-lg">Punteggio Totale: {team.points} XP</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Data Completamento</label>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center h-[92px]">
                <div className="text-xl font-bold text-slate-700">{new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Badge Ottenuti ({team.badges.length})</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {team.badges.map((badge) => (
                <div key={badge.id} className="bg-white border border-slate-100 p-4 rounded-2xl flex flex-col items-center text-center shadow-sm">
                  <span className="text-3xl mb-2">{badge.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-tight text-slate-800 leading-tight">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 pt-12 border-t border-slate-100">
            <h3 className="text-2xl font-black text-slate-900">Competenze Acquisite</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.values(PillarType).map((pillar, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                  <span className="text-2xl">✅</span>
                  <span className="font-bold text-slate-700">{pillar}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-24 text-center space-y-4">
            <p className="text-slate-400 text-sm font-medium italic">Questo documento attesta la partecipazione attiva e il superamento delle sfide interattive di Agile Academy.AI</p>
            <div className="flex justify-center gap-4 no-print">
              <button 
                onClick={handlePrint}
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center gap-2"
              >
                <span>🖨️</span> Stampa o Salva PDF
              </button>
              <button 
                onClick={onClose}
                className="bg-slate-100 text-slate-600 px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportReport;
