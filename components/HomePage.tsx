
import React from 'react';
import Logo from './Logo';
import { UserRole } from '../types';

const LeafDecoration = ({ color, className }: { color: string, className: string }) => (
  <svg viewBox="0 0 100 100" fill={color} className={`pointer-events-none select-none opacity-5 ${className}`} xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10C50 10 90 35 90 65C90 95 50 90 50 90C50 90 10 95 10 65C10 35 50 10 50 10Z" />
    <path d="M50 15V85" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" />
    <path d="M50 35L75 50" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
    <path d="M50 55L80 70" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
    <path d="M50 35L25 50" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
    <path d="M50 55L20 70" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
  </svg>
);

interface HomePageProps {
  onStart: (role: UserRole) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStart }) => {
  const scrollToProgram = () => {
    const element = document.getElementById('percorso');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-rose-100 selection:text-rose-900 overflow-y-auto scroll-smooth pb-20 relative">
      {/* Background Leaves for Home */}
      <div className="absolute top-[15%] left-[5%] w-64 h-64 rotate-[-15deg] -z-10">
        <LeafDecoration color="#f9963f" className="w-full h-full" />
      </div>

      {/* Hero Section */}
      <header className="relative pt-16 pb-20 text-center z-10">
        <div className="max-w-7xl mx-auto px-6">
          <Logo />
          <h1 className="mt-10 text-5xl font-black tracking-tighter text-[#333333] sm:text-8xl">Agile Academy.AI</h1>
          <p className="mt-6 text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            L'evoluzione del mindset Agile potenziata dall'AI. <br/>Il metodo scientifico applicato alle persone.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => onStart(UserRole.TRAINER)} 
              className="w-full sm:w-auto rounded-full bg-[#f9963f] px-12 py-5 text-xl font-black text-white shadow-xl hover:scale-105 transition-all uppercase tracking-widest"
            >
              Inizia Ora
            </button>
            <button onClick={scrollToProgram} className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] hover:text-[#e95c7b] transition-colors">
              Scopri il Metodo ↓
            </button>
          </div>
        </div>
      </header>

      {/* MetàHodòs Vision & Mission - Sezione "Manifesto" */}
      <section className="py-24 bg-[#333333] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
          <Logo light compact />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-xs font-black uppercase tracking-[0.6em] text-[#f9963f] mb-8">La nostra Visione</h2>
              <div className="space-y-6">
                <p className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                  Rendere l'eccellenza strategica <span className="text-[#f9963f]">semplice</span>, umana e immediata.
                </p>
                <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl">
                  Trasformiamo la complessità in risultati pratici stando <span className="text-white underline decoration-[#e95c7b] decoration-4 underline-offset-8">"nel fango"</span> con i leader, parlando un linguaggio diretto e usando un approccio empatico.
                </p>
              </div>
            </div>
            
            <div className="flex-1 w-full">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Empatia Operativa", icon: "🤝", desc: "Sentiamo le sfide del team sulla nostra pelle." },
                  { title: "Semplicità Radicale", icon: "⚡", desc: "Tagliamo il superfluo per arrivare al valore." },
                  { title: "Toolbox Infinita", icon: "🛠️", desc: "Non solo martelli, ma un intero arsenale agile." },
                  { title: "Zero Ego", icon: "⭕", desc: "Il risultato del progetto viene prima di noi." }
                ].map((p, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-[40px] hover:bg-white/10 transition-all group">
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">{p.icon}</div>
                    <h4 className="text-sm font-black uppercase tracking-widest mb-2">{p.title}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-tight">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Percorso Section - 3 Moduli Ingranditi */}
      <section id="percorso" className="py-24 bg-slate-50/50 backdrop-blur-sm z-10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
             <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-400 mb-2">Il Percorso Formativo</h2>
             <div className="w-20 h-1 bg-[#e95c7b]"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Blocco 01 - Ingrandito */}
            <div className="bg-white/80 backdrop-blur-sm p-16 rounded-[70px] shadow-sm border border-slate-100 flex flex-col group hover:shadow-2xl transition-all relative overflow-hidden min-h-[480px]">
              <div className="absolute -bottom-4 -right-4 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity">
                <LeafDecoration color="#e95c7b" className="w-full h-full" />
              </div>
              <div className="text-7xl font-black text-slate-100 group-hover:text-[#e95c7b] transition-colors mb-8">01</div>
              <h3 className="text-3xl font-black text-[#333333] mb-6 uppercase tracking-tighter leading-tight">Comune: Fondamenta</h3>
              <p className="text-slate-500 text-lg mb-8 leading-relaxed font-medium">Giorno 1 & 2: Abbattimento silos, cultura Fail-Safe e la grande simulazione LEGO Scrum per testare il flusso.</p>
              <div className="mt-auto pt-8 border-t border-slate-50 text-xs font-black uppercase tracking-[0.2em] text-[#e95c7b]">Mindset & Esecuzione</div>
            </div>

            {/* Blocco 02 - Ingrandito */}
            <div className="bg-white/80 backdrop-blur-sm p-16 rounded-[70px] shadow-sm border border-slate-100 flex flex-col group hover:shadow-2xl transition-all ring-4 ring-[#70c174]/5 relative overflow-hidden min-h-[480px]">
               <div className="absolute -bottom-4 -right-4 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity">
                <LeafDecoration color="#70c174" className="w-full h-full" />
              </div>
              <div className="text-7xl font-black text-slate-100 group-hover:text-[#70c174] transition-colors mb-8">02</div>
              <h3 className="text-3xl font-black text-[#333333] mb-6 uppercase tracking-tighter leading-tight">Scrum Master</h3>
              <p className="text-slate-500 text-lg mb-8 leading-relaxed font-medium">Giorno 3: Servant Leadership, facilitazione avanzata e analisi delle metriche per abilitare l'autonomia del team.</p>
              <div className="mt-auto pt-8 border-t border-slate-50 text-xs font-black uppercase tracking-[0.2em] text-[#70c174]">Coaching & Facilitazione</div>
            </div>

            {/* Blocco 03 - Ingrandito */}
            <div className="bg-white/80 backdrop-blur-sm p-16 rounded-[70px] shadow-sm border border-slate-100 flex flex-col group hover:shadow-2xl transition-all ring-4 ring-[#f9963f]/5 relative overflow-hidden min-h-[480px]">
               <div className="absolute -bottom-4 -right-4 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity">
                <LeafDecoration color="#f9963f" className="w-full h-full" />
              </div>
              <div className="text-7xl font-black text-slate-100 group-hover:text-[#f9963f] transition-colors mb-8">03</div>
              <h3 className="text-3xl font-black text-[#333333] mb-6 uppercase tracking-tighter leading-tight">Product Owner</h3>
              <p className="text-slate-500 text-lg mb-8 leading-relaxed font-medium">Giorno 4: Massimizzazione del valore, prioritizzazione strategica e Workshop finale sul caso reale SACMI.</p>
              <div className="mt-auto pt-8 border-t border-slate-50 text-xs font-black uppercase tracking-[0.2em] text-[#f9963f]">Visione & Business</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Professionale */}
      <footer className="py-24 bg-white border-t border-slate-100 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Logo />
          <div className="mt-12 space-y-2 text-[#555555] font-medium text-sm sm:text-base leading-relaxed">
            <p className="font-bold text-[#333333]">Francesco De Sario – Via Albini 27, 40137 Bologna (BO)</p>
            <p>P.Iva: 03819481205 – C.F.: DSRFNC69B10M082I – CID: KRRH6B9</p>
            <p>Tel. +39 328 268 2183 – <a href="mailto:effeone@pec.it" className="hover:text-[#e95c7b] transition-colors">effeone@pec.it</a></p>
            <p className="pt-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Privacy Policy</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
