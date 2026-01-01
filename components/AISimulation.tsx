
import React, { useState, useRef } from 'react';
import { generateAgileChallenge, askAgileCoach, evaluateSolutionWithImage, evaluateSolutionWithCards } from '../services/geminiService';
import { Challenge, ProductCard } from '../types';
import { LEGO_CITY_CARDS, SACMI_STORY_CARDS } from '../constants';

interface AISimulationProps {
  pillar: string;
  role: string;
  onComplete: (score: number) => void;
  moduleId?: string;
}

const AISimulation: React.FC<AISimulationProps> = ({ pillar, role, onComplete, moduleId }) => {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userSolution, setUserSolution] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentSacmiPhase, setCurrentSacmiPhase] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLegoSim = moduleId === 'm4';
  const isSacmiWorkshop = moduleId === 'm-sacmi';

  const getSpecializedType = () => {
    if (moduleId === 'm0') return 'silos';
    if (moduleId === 'm-us') return 'user-stories';
    if (moduleId === 'm4') return 'scrum-lego';
    if (moduleId === 'm-sacmi') return 'sacmi';
    if (moduleId === 'm-sm-servant') return 'sm-servant';
    if (moduleId === 'm-sm-facilitation') return 'sm-facilitation';
    if (moduleId === 'm-sm-conflict') return 'sm-conflict';
    if (moduleId === 'm-sm-metrics') return 'sm-metrics';
    if (moduleId === 'm-po-prior') return 'po-prior';
    if (moduleId === 'm-po-stake') return 'po-stake';
    if (moduleId === 'm-po-val-metrics') return 'po-val-metrics';
    if (moduleId === 'm-po-discovery') return 'po-discovery';
    return undefined;
  };

  const startSim = async () => {
    setIsLoading(true);
    const result = await generateAgileChallenge(pillar, role, getSpecializedType());
    if (result) setChallenge(result);
    setIsLoading(false);
  };

  const toggleCard = (cardId: string) => {
    setSelectedCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId) 
        : [...prev, cardId]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      (Array.from(files) as File[]).forEach(file => {
        if (selectedImages.length >= 3) return;
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImages(prev => [...prev, reader.result as string].slice(0, 3));
        };
        reader.readAsDataURL(file);
      });
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const getHint = async () => {
    setHintsUsed(prev => prev + 1);
    const hint = await askAgileCoach(`Suggerimento Coach MetàHodòs: ${challenge?.description || 'Analizzate i vincoli e il valore.'}`);
    alert(hint);
  };

  const submitSolution = async () => {
    if (!challenge) return;
    setIsEvaluating(true);
    setFeedback(null);

    let assessment = "";
    if (isLegoSim && selectedCards.length > 0) {
      const cardNames = selectedCards.map(id => LEGO_CITY_CARDS.find(c => c.id === id)?.name || id);
      assessment = await evaluateSolutionWithCards(challenge.description, cardNames, userSolution);
    } else {
      assessment = await evaluateSolutionWithImage(
        challenge.description, 
        userSolution, 
        selectedImages.length > 0 ? selectedImages : undefined
      );
    }
    
    setFeedback(assessment);
    setIsEvaluating(false);

    if (assessment.toUpperCase().includes('APPROVATA')) {
      let points = 10;
      if (hintsUsed === 1) points = 7;
      else if (hintsUsed === 2) points = 4;
      else if (hintsUsed > 2) points = 1;
      setTimeout(() => onComplete(points), 6000);
    }
  };

  if (!challenge) {
    const isSpecial = !!getSpecializedType();
    return (
      <div className="bg-indigo-900 text-white p-12 rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500">🤖</div>
        <h3 className="text-4xl font-black">{isSacmiWorkshop ? 'Workshop Strategico SACMI' : isSpecial ? 'Laboratorio Esperienziale AI' : 'Simulazione AI Real-time'}</h3>
        <p className="opacity-80 text-lg max-w-xl mx-auto font-medium">
          {isSacmiWorkshop 
            ? "Simulazione intensiva di 3 ore. Affronterete il caso reale delle capsule in cellulosa. Siete pronti?"
            : isLegoSim 
            ? "Usa le carte digitali per simulare la costruzione della tua città LEGO. L'AI valuterà la tua strategia di prodotto."
            : "Metti in pratica le competenze del modulo con l'aiuto del Coach AI."}
        </p>
        <button 
          onClick={startSim} 
          disabled={isLoading}
          className="bg-white text-indigo-900 px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 hover:bg-indigo-50 transition-all shadow-2xl shadow-indigo-400/20"
        >
          {isLoading ? 'Caricamento Scenario...' : '🚀 Inizia Workshop'}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-indigo-100 animate-in fade-in zoom-in-95 duration-300">
      {isSacmiWorkshop && (
        <div className="mb-10 flex gap-2">
          {[1,2,3,4].map(p => (
            <button 
              key={p} 
              onClick={() => setCurrentSacmiPhase(p)}
              className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${currentSacmiPhase === p ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}
            >
              Fase {p} {p === 1 && 'Setup'} {p === 2 && 'Vision'} {p === 3 && 'Backlog'} {p === 4 && 'Planning'}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
        <div>
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{challenge.difficulty}</span>
          <h3 className="text-3xl font-black text-slate-800 mt-2 tracking-tight">{challenge.title}</h3>
        </div>
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-right">
          <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Aiuti</div>
          <div className="text-xl font-black text-indigo-600">{hintsUsed}</div>
        </div>
      </div>

      <div className="text-slate-600 bg-indigo-50/30 p-8 rounded-2xl mb-8 border-l-8 border-indigo-500 italic text-xl shadow-inner leading-relaxed">
        {isSacmiWorkshop ? (
          <>
            {currentSacmiPhase === 1 && "Benvenuti in SACMI. Obiettivo: Linea produzione capsule cellulosa in 18 mesi. Vincoli: certificazioni alimentari, mercato competitivo. Siete un team multidisciplinare (Meccanici, Elettronici, Software, Quality)."}
            {currentSacmiPhase === 2 && "Definite la Vision del prodotto (Elevator Pitch) e identificate le 3 feature MINIME per l'MVP."}
            {currentSacmiPhase === 3 && "Building Backlog: Prioritizzate le story con MoSCoW e stimate la complessità."}
            {currentSacmiPhase === 4 && "Sprint 0 Planning: Presentate il vostro backlog e identificate rischi e dipendenze hardware."}
          </>
        ) : challenge.description}
      </div>

      <div className="space-y-8">
        {isSacmiWorkshop && currentSacmiPhase === 3 && (
          <div className="space-y-4">
            <label className="block text-sm font-black text-slate-700 uppercase tracking-widest">SACMI User Story Deck</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SACMI_STORY_CARDS.map(story => (
                <div key={story.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium flex gap-3 items-center">
                   <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-black">ID</span>
                   <p className="flex-1">{story.text}</p>
                   <div className="text-[10px] font-black text-slate-400">V: {story.value} | C: {story.complexity}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isLegoSim && (
          <div className="space-y-4">
            <label className="block text-sm font-black text-slate-700 uppercase tracking-widest">Mazzo Carte Prodotto - LEGO City</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {LEGO_CITY_CARDS.map(card => (
                <button
                  key={card.id}
                  onClick={() => toggleCard(card.id)}
                  className={`p-4 rounded-2xl border-2 transition-all text-left flex flex-col h-full ${
                    selectedCards.includes(card.id) 
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg scale-105' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-indigo-300'
                  }`}
                >
                  <span className="text-2xl mb-2">{card.icon}</span>
                  <span className="font-bold text-xs mb-1 uppercase tracking-tight">{card.name}</span>
                  <div className="mt-auto flex justify-between text-[10px] font-black opacity-60">
                    <span>V: {card.value}</span>
                    <span>C: {card.complexity}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <label className="block text-sm font-black text-slate-700 uppercase tracking-widest">
            {isSacmiWorkshop ? `Input Fase ${currentSacmiPhase}` : 'Riflessione Strategica del Team'}
          </label>
          <textarea 
            value={userSolution}
            onChange={(e) => setUserSolution(e.target.value)}
            placeholder={isSacmiWorkshop ? "Descrivete qui il risultato di questa fase del workshop..." : "Spiegate la vostra scelta o l'approccio alla sfida..."}
            className="w-full h-32 p-5 bg-slate-50 border-2 border-slate-200 rounded-3xl outline-none focus:border-indigo-500 transition-all text-lg font-medium"
          ></textarea>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-black text-slate-700 uppercase tracking-widest">Foto dei Lavori / Canvas (max 3)</label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {selectedImages.map((img, index) => (
              <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-slate-100">
                <img src={img} alt="Lavoro" className="w-full h-full object-cover" />
                <button onClick={() => removeImage(index)} className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center">✕</button>
              </div>
            ))}
            {selectedImages.length < 3 && (
              <button onClick={() => fileInputRef.current?.click()} className="aspect-square rounded-2xl border-4 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400">
                <span className="text-3xl">📸</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-center pt-4 border-t border-slate-100">
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" ref={fileInputRef} />
          <button onClick={getHint} className="px-8 py-4 bg-amber-100 text-amber-700 rounded-2xl font-bold border border-amber-200">💡 Aiuto Coach</button>
          <button 
            onClick={submitSolution}
            disabled={isEvaluating || (!userSolution.trim() && selectedImages.length === 0)}
            className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            {isEvaluating ? 'Il Coach sta analizzando...' : isSacmiWorkshop ? '🚀 Valuta Workshop' : '🚀 Invia per Valutazione AI'}
          </button>
        </div>
      </div>

      {feedback && (
        <div className={`mt-10 p-10 rounded-[40px] border-4 shadow-2xl animate-in slide-in-from-top-4 ${feedback.toUpperCase().includes('APPROVATA') ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-amber-50 text-amber-900 border-amber-200'}`}>
          <h4 className="text-2xl font-black uppercase tracking-tight mb-4">Feedback Coach MetàHodòs:</h4>
          <div className="text-xl leading-relaxed font-medium">
             {feedback.split('\n').map((line, i) => <p key={i} className="mb-2">{line}</p>)}
          </div>
        </div>
      )}
    </div>
  );
};

export default AISimulation;
