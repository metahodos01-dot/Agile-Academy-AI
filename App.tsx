
import { COURSE_MODULES, PILLARS_DESCRIPTION } from './constants';
import { Module, UserRole, Team, Badge, PillarType, TrainingSession, Attendee } from './types';
import Timer from './components/Timer';
import Quiz from './components/Quiz';
import AISimulation from './components/AISimulation';
import TheorySection from './components/TheorySection';
import BadgeDisplay from './components/BadgeDisplay';
import Logo from './components/Logo';
import HomePage from './components/HomePage';
import AgileNutshell from './components/AgileNutshell';
import ExportReport from './components/ExportReport';
import { saveSession } from './services/supabaseService';
import React, { useState } from 'react';

const LeafDecoration = ({ color, className }: { color: string, className: string }) => (
  <svg viewBox="0 0 100 100" fill={color} className={`pointer-events-none select-none opacity-10 ${className}`} xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10C50 10 90 35 90 65C90 95 50 90 50 90C50 90 10 95 10 65C10 35 50 10 50 10Z" />
    <path d="M50 15V85" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" />
    <path d="M50 35L75 50" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
    <path d="M50 55L80 70" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
    <path d="M50 35L25 50" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
    <path d="M50 55L20 70" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
  </svg>
);

const App: React.FC = () => {
  const [isHome, setIsHome] = useState(true);
  const [activeModule, setActiveModule] = useState<Module>(COURSE_MODULES[0]);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.TRAINER);
  const [currentView, setCurrentView] = useState<'content' | 'theory' | 'quiz' | 'sim' | 'scrum' | 'nutshell' | 'report' | 'setup'>('content');
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [lastEarnedBadge, setLastEarnedBadge] = useState<{badge: Badge, score: number} | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Session Info
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [edition, setEdition] = useState('');
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [newAttendeeName, setNewAttendeeName] = useState('');
  const [selectedTeamForAttendee, setSelectedTeamForAttendee] = useState('');
  const [newTeamName, setNewTeamName] = useState('');

  const selectedTeam = teams.find(t => t.id === selectedTeamId);

  const filteredModules = COURSE_MODULES.filter(m => {
    if (!m.roleSpecific) return true;
    return m.roleSpecific === userRole || userRole === UserRole.TRAINER;
  });

  const handleStartCourse = (role: UserRole) => {
    setUserRole(role);
    setIsHome(false);
    setCurrentView('setup');
    setActiveModule(COURSE_MODULES[0]);
  };

  const handleModuleComplete = (points: number) => {
    const newBadge: Badge = {
      id: `b-${activeModule.id}`,
      name: `Esperto ${activeModule.pillar.split(' ')[1] || activeModule.pillar}`,
      icon: '🏆',
      moduleTitle: activeModule.title
    };

    if (selectedTeamId) {
      setTeams(prev => prev.map(t => {
        if (t.id === selectedTeamId) {
          const alreadyHas = t.badges.find(b => b.id === newBadge.id);
          return { 
            ...t, 
            points: t.points + points,
            badges: alreadyHas ? t.badges : [...t.badges, newBadge]
          };
        }
        return t;
      }));
    }
    
    setLastEarnedBadge({ badge: newBadge, score: points });
  };

  const handleFinishCourse = async () => {
    if (!selectedTeam) return alert("Seleziona un team per salvare la sessione.");
    
    setIsSaving(true);
    const sessionData: TrainingSession = {
      team_name: selectedTeam.name,
      total_points: selectedTeam.points,
      role: userRole,
      badges_count: selectedTeam.badges.length,
      attendees,
      session_date: sessionDate,
      edition,
      summary_data: {
        badges: selectedTeam.badges,
        completed_at: new Date().toISOString()
      }
    };

    const { error } = await saveSession(sessionData);
    setIsSaving(false);
    
    if (error) {
      alert("Errore nel salvataggio su Supabase. Sessione salvata localmente.");
    }
    setCurrentView('report');
  };

  const addTeam = () => {
    if (!newTeamName.trim()) return;
    const team: Team = {
      id: Math.random().toString(36).substr(2, 9),
      name: newTeamName.trim(),
      points: 0,
      badges: []
    };
    setTeams([...teams, team]);
    setNewTeamName('');
    if (!selectedTeamForAttendee) setSelectedTeamForAttendee(team.name);
  };

  const addAttendee = () => {
    if (!newAttendeeName.trim() || !selectedTeamForAttendee) return;
    setAttendees([...attendees, { name: newAttendeeName.trim(), teamName: selectedTeamForAttendee }]);
    setNewAttendeeName('');
  };

  const removeAttendee = (idx: number) => {
    setAttendees(attendees.filter((_, i) => i !== idx));
  };

  const closeBadgeModal = () => {
    setLastEarnedBadge(null);
    setCurrentView('content');
    const currentIdx = filteredModules.findIndex(m => m.id === activeModule.id);
    if (currentIdx < filteredModules.length - 1) {
      setActiveModule(filteredModules[currentIdx + 1]);
    }
  };

  const handleTriggerExperiential = () => {
    setCurrentView('sim');
    const mainArea = document.querySelector('main');
    if (mainArea) mainArea.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isHome) {
    return <HomePage onStart={handleStartCourse} />;
  }

  const pillars = Object.values(PillarType);

  const getRoleLabel = (role?: UserRole) => {
    if (!role) return 'COMUNE';
    if (role === UserRole.PRODUCT_OWNER) return 'PO';
    if (role === UserRole.SCRUM_MASTER) return 'SM';
    return '';
  };

  const getRoleBadgeClasses = (role?: UserRole, active?: boolean) => {
    if (!role) {
      return active 
        ? 'bg-slate-100 text-slate-500' 
        : 'bg-slate-400/20 text-slate-300';
    }
    if (role === UserRole.PRODUCT_OWNER) {
      return active 
        ? 'bg-orange-100 text-orange-600' 
        : 'bg-orange-500/30 text-orange-300';
    }
    if (role === UserRole.SCRUM_MASTER) {
      return active 
        ? 'bg-green-100 text-green-600' 
        : 'bg-green-500/30 text-green-300';
    }
    return '';
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white relative pb-32">
      {/* Sidebar Navigation - Aggiornata al grigio richiesto #4a4e57 */}
      <nav className="w-full md:w-80 bg-[#4a4e57] text-white p-6 flex flex-col h-screen overflow-y-auto sticky top-0 z-20 shadow-2xl no-print">
        <div className="mb-10 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setIsHome(true)}>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight leading-none text-white">Agile Academy.AI</h1>
            <p className="text-white/50 text-[10px] font-medium uppercase tracking-widest mt-1">by MetàHodòs</p>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <div>
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-3">Materiali Extra</label>
            <button 
              onClick={() => setCurrentView('nutshell')}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold text-sm transition-all ${currentView === 'nutshell' ? 'bg-[#f9963f] text-white shadow-lg' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
            >
              <span>🥜</span> Agile in a Nutshell
            </button>
          </div>
          
          <div>
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-3">Percorso Formativo</label>
            <select 
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as UserRole)}
              className="w-full bg-white/10 border-none rounded-xl py-3 px-4 text-sm font-medium focus:ring-1 focus:ring-white/20 outline-none transition-all cursor-pointer text-white"
            >
              <option value={UserRole.TRAINER} className="bg-[#4a4e57]">Vista Trainer (Tutti)</option>
              <option value={UserRole.SCRUM_MASTER} className="bg-[#4a4e57]">Scrum Master</option>
              <option value={UserRole.PRODUCT_OWNER} className="bg-[#4a4e57]">Product Owner</option>
            </select>
          </div>

          <button 
            onClick={() => setCurrentView('setup')}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold text-sm transition-all ${currentView === 'setup' ? 'bg-[#e95c7b] text-white shadow-lg' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
          >
            <span>📝</span> Registro Sessione
          </button>
        </div>

        {/* Menu Moduli con look "ASCOLTO" in miniatura e CONTORNO BIANCO */}
        <div className="flex-1 space-y-4 overflow-y-auto pr-1">
          {filteredModules.map((m, idx) => {
            const isActive = activeModule.id === m.id && !['nutshell', 'report', 'setup'].includes(currentView);
            return (
              <button
                key={m.id}
                onClick={() => { setActiveModule(m); setCurrentView('content'); }}
                className={`w-full text-left p-5 rounded-2xl transition-all relative overflow-hidden group border-2 ${
                  isActive
                  ? 'bg-white border-white shadow-xl scale-[1.02]' 
                  : 'bg-white/5 border-white/30 hover:bg-white/10 hover:border-white/50'
                }`}
              >
                {/* Numero gigante in background stile Ascolto */}
                <div className={`absolute -right-2 top-0 text-7xl font-black leading-none pointer-events-none select-none transition-opacity ${
                  isActive
                  ? 'text-[#f5e9da] opacity-100' 
                  : 'text-black/10 opacity-30'
                }`}>
                  {idx + 1}
                </div>
                
                <div className="relative z-10 flex flex-col gap-1">
                  {/* Badge Metadati Giorno e Ruolo con COLORI SPECIFICI */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-sm ${isActive ? 'bg-[#e95c7b] text-white' : 'bg-white/20 text-white/70'}`}>
                      Giorno {m.day}
                    </span>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-sm ${getRoleBadgeClasses(m.roleSpecific, isActive)}`}>
                      {getRoleLabel(m.roleSpecific)}
                    </span>
                  </div>
                  
                  <div className={`text-sm uppercase tracking-tighter leading-tight ${
                    isActive
                    ? 'font-black text-[#333]' 
                    : 'font-normal text-white'
                  }`}>
                    {m.title}
                  </div>
                  
                  {isActive && (
                    <div className="w-10 h-1 bg-[#e95c7b] mt-1 rounded-full"></div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 pt-8 border-t border-white/10">
           {/* Selettore Team Attivo per Punteggio */}
           <div className="space-y-4">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Team Attivo per Scoring</label>
              {teams.length === 0 ? (
                <p className="text-white/40 text-[10px] italic">Crea dei team nel Registro per iniziare.</p>
              ) : (
                <div className="space-y-2">
                  {teams.map(team => (
                    <button
                      key={team.id}
                      onClick={() => setSelectedTeamId(team.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all border ${
                        selectedTeamId === team.id ? 'bg-white/20 border-white' : 'bg-white/5 border-transparent hover:bg-white/10'
                      }`}
                    >
                      <div className="text-left">
                        <div className={`text-xs font-bold ${selectedTeamId === team.id ? 'text-white' : 'text-slate-300'}`}>{team.name}</div>
                        <div className="text-[10px] text-white/40">{team.points} Punti</div>
                      </div>
                      {selectedTeamId === team.id && <div className="w-2 h-2 bg-[#70c174] rounded-full animate-pulse"></div>}
                    </button>
                  ))}
                </div>
              )}
           </div>
        </div>

        <button 
          onClick={handleFinishCourse}
          disabled={isSaving || !selectedTeamId}
          className="mt-6 w-full py-4 bg-[#70c174] hover:bg-[#5daf61] text-white font-black rounded-2xl shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
        >
          {isSaving ? 'Salvataggio...' : '🏁 Termina & Esporta'}
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 h-screen overflow-y-auto scroll-smooth bg-white relative">
        {/* Background Leaves Decorations */}
        <div className="absolute top-20 right-10 w-48 h-48 rotate-12 -z-10">
          <LeafDecoration color="#f9963f" className="w-full h-full" />
        </div>
        <div className="absolute bottom-40 left-10 w-64 h-64 -rotate-12 -z-10">
          <LeafDecoration color="#4a4e57" className="w-full h-full" />
        </div>
        <div className="absolute top-[40%] right-[-50px] w-32 h-32 rotate-[45deg] -z-10">
          <LeafDecoration color="#f9963f" className="w-full h-full" />
        </div>

        <div className="max-w-4xl mx-auto pb-48 relative z-10">
          
          {currentView === 'setup' ? (
            <div className="space-y-12 animate-in fade-in duration-500">
               {/* Titolo Setup stile ASCOLTO */}
               <div className="relative pt-12">
                <div className="absolute top-0 left-0 text-[180px] font-black text-[#f5e9da] leading-none -z-10 select-none">
                  0
                </div>
                <h2 className="text-6xl font-black text-[#333] tracking-tighter uppercase relative z-10 leading-none">
                  REGISTRO
                </h2>
                <div className="w-24 h-1.5 bg-[#e95c7b] mt-4"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-16">
                {/* Colonna Sinistra: Info Sessione */}
                <div className="space-y-10">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Edizione Corso</label>
                      <input 
                        type="text" 
                        value={edition}
                        onChange={(e) => setEdition(e.target.value)}
                        placeholder="es. SACMI Autunno 2025"
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-5 text-lg font-medium outline-none focus:border-[#e95c7b] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Data Inizio</label>
                      <input 
                        type="date" 
                        value={sessionDate}
                        onChange={(e) => setSessionDate(e.target.value)}
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-5 text-lg font-medium outline-none focus:border-[#e95c7b] transition-all"
                      />
                    </div>
                  </div>

                  {/* Gestione Team Integrata */}
                  <div className="space-y-6 pt-10 border-t border-slate-100">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">1. Definisci i Gruppi (Team)</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={newTeamName}
                        onChange={(e) => setNewTeamName(e.target.value)}
                        placeholder="Nome nuovo team..."
                        onKeyDown={(e) => e.key === 'Enter' && addTeam()}
                        className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-5 text-lg font-medium outline-none focus:border-[#e95c7b] transition-all"
                      />
                      <button 
                        onClick={addTeam}
                        className="bg-slate-900 text-white px-6 rounded-2xl font-black hover:bg-slate-800 transition-all text-2xl"
                      >+</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {teams.map(t => (
                        <div key={t.id} className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 shadow-sm flex items-center gap-2">
                          {t.name}
                          <button onClick={() => setTeams(teams.filter(team => team.id !== t.id))} className="text-slate-300 hover:text-rose-400">✕</button>
                        </div>
                      ))}
                      {teams.length === 0 && <p className="text-slate-400 text-xs italic">Nessun team creato.</p>}
                    </div>
                  </div>

                  <button 
                    onClick={() => setCurrentView('content')}
                    className="w-full py-5 bg-[#f9963f] text-white font-black rounded-3xl shadow-xl hover:scale-105 transition-all uppercase tracking-widest text-sm"
                  >
                    🚀 Inizia Percorso Formativo
                  </button>
                </div>

                {/* Colonna Destra: Partecipanti e Associazione Team */}
                <div className="space-y-10">
                  <div className="space-y-6">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">2. Registra Partecipanti</label>
                    <div className="space-y-3">
                      <input 
                        type="text" 
                        value={newAttendeeName}
                        onChange={(e) => setNewAttendeeName(e.target.value)}
                        placeholder="Nome partecipante..."
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-5 text-lg font-medium outline-none focus:border-[#e95c7b] transition-all"
                      />
                      <div className="flex gap-2">
                        <select 
                          value={selectedTeamForAttendee}
                          onChange={(e) => setSelectedTeamForAttendee(e.target.value)}
                          className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-5 text-lg font-medium outline-none focus:border-[#e95c7b] transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Seleziona Team...</option>
                          {teams.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                        </select>
                        <button 
                          onClick={addAttendee}
                          disabled={!newAttendeeName.trim() || !selectedTeamForAttendee}
                          className="bg-slate-900 text-white px-8 rounded-2xl font-black hover:bg-slate-800 transition-all text-xl disabled:opacity-30"
                        >AGGIUNGI</button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {attendees.map((a, i) => (
                      <div key={i} className="flex justify-between items-center p-5 bg-white border border-slate-100 rounded-[28px] shadow-sm group hover:border-[#f9963f] transition-all">
                        <div className="flex flex-col">
                          <span className="font-black text-slate-800 text-lg">{a.name}</span>
                          <span className="text-[10px] font-black text-[#f9963f] uppercase tracking-widest">{a.teamName}</span>
                        </div>
                        <button onClick={() => removeAttendee(i)} className="text-rose-400 p-2 hover:bg-rose-50 rounded-full transition-all">✕</button>
                      </div>
                    ))}
                    {attendees.length === 0 && (
                      <div className="text-center py-20 border-4 border-dashed border-slate-50 rounded-[40px]">
                        <p className="text-slate-300 font-black uppercase tracking-widest text-xs">Nessun partecipante registrato.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : currentView === 'nutshell' ? (
            <AgileNutshell />
          ) : currentView === 'report' && selectedTeam ? (
            <ExportReport 
              team={selectedTeam} 
              role={userRole} 
              onClose={() => setCurrentView('content')} 
            />
          ) : (
            <>
              {/* Header Modulo stile ASCOLTO */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16">
                <div className="relative pt-12 flex-1">
                  {/* Numero gigante beige */}
                  <div className="absolute top-0 left-0 text-[200px] font-black text-[#f5e9da] leading-none -z-10 select-none opacity-80">
                    {filteredModules.findIndex(m => m.id === activeModule.id) + 1}
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-[#e95c7b] text-white px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">
                        Giorno {activeModule.day}
                      </span>
                      <span className="text-slate-400 text-sm font-bold tracking-tight uppercase">
                        • {activeModule.pillar}
                      </span>
                    </div>
                    <h2 className="text-6xl font-black text-[#333] tracking-tighter uppercase leading-none mb-6">
                      {activeModule.title}
                    </h2>
                    {/* Linea rossa accento */}
                    <div className="w-32 h-2 bg-[#e95c7b]"></div>
                    <p className="mt-8 text-xl text-slate-500 font-medium max-w-xl leading-relaxed">
                      {activeModule.description}
                    </p>
                  </div>
                </div>
                <Timer initialMinutes={activeModule.durationMinutes} />
              </div>

              {/* Activity Tabs - Nuova grafica menu */}
              <div className="flex flex-wrap gap-4 mb-12 border-b border-slate-100 pb-4">
                <button 
                  onClick={() => setCurrentView('content')}
                  className={`px-0 py-2 font-black text-sm uppercase tracking-widest transition-all relative ${currentView === 'content' ? 'text-[#333] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-1 after:bg-[#e95c7b]' : 'text-slate-300 hover:text-slate-500'}`}
                >Intro</button>
                <button 
                  onClick={() => setCurrentView('theory')}
                  className={`px-0 py-2 font-black text-sm uppercase tracking-widest transition-all relative ${currentView === 'theory' ? 'text-[#333] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-1 after:bg-[#e95c7b]' : 'text-slate-300 hover:text-slate-500'}`}
                >Teoria</button>
                {activeModule.scrumInfo && (
                  <button 
                    onClick={() => setCurrentView('scrum')}
                    className={`px-0 py-2 font-black text-sm uppercase tracking-widest transition-all relative ${currentView === 'scrum' ? 'text-[#70c174] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-1 after:bg-[#70c174]' : 'text-slate-300 hover:text-slate-500'}`}
                  >Scrum</button>
                )}
                <button 
                  onClick={() => setCurrentView('quiz')}
                  className={`px-0 py-2 font-black text-sm uppercase tracking-widest transition-all relative ${currentView === 'quiz' ? 'text-[#333] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-1 after:bg-[#e95c7b]' : 'text-slate-300 hover:text-slate-500'}`}
                >Quiz</button>
                <button 
                  onClick={() => setCurrentView('sim')}
                  className={`px-0 py-2 font-black text-sm uppercase tracking-widest transition-all relative ${currentView === 'sim' ? 'text-[#f9963f] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-1 after:bg-[#f9963f]' : 'text-slate-300 hover:text-slate-500'}`}
                >Simulazione</button>
              </div>

              {/* View Rendering */}
              <div className="animate-in fade-in duration-500">
                {currentView === 'content' && (
                  <div className="space-y-12">
                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="md:col-span-2 space-y-6">
                        <div className="bg-slate-50/80 backdrop-blur-sm p-10 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden group">
                           {/* Decorazione Numero Modulo */}
                          <div className="absolute -bottom-10 -right-10 text-[120px] font-black text-black/5 leading-none pointer-events-none group-hover:scale-110 transition-transform">
                            {activeModule.day}
                          </div>

                          <h3 className="text-2xl font-black text-[#333] mb-6 uppercase tracking-tight">Obiettivi del Modulo</h3>
                          <p className="text-slate-600 leading-relaxed text-xl mb-8 font-medium">{activeModule.content}</p>
                          <div className="p-8 bg-white rounded-3xl border-l-[12px] border-[#e95c7b] italic text-[#333] font-bold text-xl shadow-md">
                            " {PILLARS_DESCRIPTION[activeModule.pillar]} "
                          </div>

                          <div className="mt-12 pt-10 border-t border-slate-200">
                            <h4 className="text-sm font-black text-[#e95c7b] mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                              Feedback Esperienziale
                            </h4>
                            <div className="text-slate-500 leading-relaxed italic text-lg font-medium">
                              {activeModule.eventDebrief}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div 
                        onClick={handleTriggerExperiential}
                        className="bg-[#f9963f] p-10 rounded-[60px] shadow-2xl self-start cursor-pointer hover:scale-[1.05] transition-all group active:scale-95 text-white shadow-[#f9963f]/30 relative overflow-hidden"
                      >
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 opacity-20">
                          <LeafDecoration color="white" className="w-full h-full" />
                        </div>
                        <div className="flex flex-col gap-4 mb-6 relative z-10">
                          <span className="text-5xl group-hover:rotate-12 transition-transform">🧩</span>
                          <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">Workshop Pratico</h3>
                        </div>
                        <div className="font-black mb-6 text-[10px] tracking-widest bg-white/20 px-4 py-1.5 rounded-full inline-block uppercase relative z-10">{activeModule.game}</div>
                        <p className="text-white font-medium leading-relaxed text-lg mb-10 relative z-10">
                          Passa all'azione. L'AI coach valuterà il vostro output esperienziale.
                        </p>
                        <div className="bg-white text-[#f9963f] text-center py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl group-hover:bg-[#fcfcfc] transition-all relative z-10">
                          LABORATORIO AI →
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentView === 'theory' && (
                  <TheorySection 
                    question={activeModule.openQuestion} 
                    officialTheory={activeModule.detailedTheory}
                    onAdvance={() => setCurrentView('quiz')}
                  />
                )}

                {currentView === 'scrum' && (
                  <div className="bg-white/90 backdrop-blur-sm p-16 rounded-[60px] border border-slate-100 shadow-2xl space-y-16">
                    <h2 className="text-5xl font-black text-[#333] uppercase tracking-tighter">Come funziona Scrum</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                      <div className="space-y-6">
                        <h3 className="text-xl font-black text-[#e95c7b] uppercase tracking-widest border-b-2 border-slate-100 pb-2">👤 Ruoli</h3>
                        <ul className="space-y-4 text-slate-600 font-bold text-lg">
                          <li><span className="text-slate-300 mr-2">›</span> Product Owner</li>
                          <li><span className="text-slate-300 mr-2">›</span> Scrum Master</li>
                          <li><span className="text-slate-300 mr-2">›</span> Developers</li>
                        </ul>
                      </div>
                      <div className="space-y-6">
                        <h3 className="text-xl font-black text-[#70c174] uppercase tracking-widest border-b-2 border-slate-100 pb-2">📅 Eventi</h3>
                        <ul className="space-y-4 text-slate-600 font-bold text-lg">
                          <li><span className="text-slate-300 mr-2">›</span> Sprint</li>
                          <li><span className="text-slate-300 mr-2">›</span> Daily Scrum</li>
                          <li><span className="text-slate-300 mr-2">›</span> Review & Retro</li>
                        </ul>
                      </div>
                      <div className="space-y-6">
                        <h3 className="text-xl font-black text-[#f9963f] uppercase tracking-widest border-b-2 border-slate-100 pb-2">📦 Artefatti</h3>
                        <ul className="space-y-4 text-slate-600 font-bold text-lg">
                          <li><span className="text-slate-300 mr-2">›</span> Backlog</li>
                          <li><span className="text-slate-300 mr-2">›</span> Incremento</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {currentView === 'quiz' && activeModule.quiz && (
                  <Quiz questions={activeModule.quiz} onComplete={handleModuleComplete} />
                )}

                {currentView === 'sim' && (
                  <AISimulation 
                    pillar={activeModule.pillar} 
                    role={userRole} 
                    onComplete={handleModuleComplete} 
                    moduleId={activeModule.id}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer Pilastri */}
      <footer className="fixed bottom-0 left-0 right-0 md:left-80 bg-white/95 backdrop-blur-md border-t border-slate-100 p-4 z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] no-print">
        <div className="max-w-4xl mx-auto">
          <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.6em] mb-4 text-center">I 6 Pilastri MetàHodòs</div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {pillars.map((pillar) => {
              const isActive = activeModule.pillar === pillar && !['nutshell', 'report', 'setup'].includes(currentView);
              return (
                <div 
                  key={pillar}
                  className={`relative p-3 rounded-2xl border transition-all duration-500 flex flex-col items-center justify-center text-center group ${
                    isActive 
                      ? 'bg-[#333] border-transparent shadow-xl scale-105 z-10' 
                      : 'bg-slate-50 border-slate-100 opacity-40 grayscale'
                  }`}
                >
                  <div className={`text-xl mb-1 transition-transform duration-500 ${isActive ? 'scale-125' : 'group-hover:scale-110'}`}>
                    {pillar === PillarType.MVP && '🎯'}
                    {pillar === PillarType.ITERATIVE && '🔄'}
                    {pillar === PillarType.OBEYA && '📊'}
                    {pillar === PillarType.AUTONOMY && '🤝'}
                    {pillar === PillarType.MANAGEMENT && '📡'}
                    {pillar === PillarType.FAIL_SAFE && '🎨'}
                  </div>
                  <div className={`text-[9px] font-black uppercase leading-tight tracking-tighter ${isActive ? 'text-white' : 'text-slate-500'}`}>
                    {pillar.split(' ')[1] || pillar}
                  </div>
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#e95c7b] rounded-full animate-ping"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </footer>

      {lastEarnedBadge && (
        <BadgeDisplay 
          badge={lastEarnedBadge.badge} 
          score={lastEarnedBadge.score} 
          onContinue={closeBadgeModal} 
        />
      )}
    </div>
  );
};

export default App;
