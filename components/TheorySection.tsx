
import React, { useState } from 'react';
import { evaluateTeamResponse } from '../services/geminiService';

interface TheorySectionProps {
  question: string;
  officialTheory: string;
  onAdvance: () => void;
}

const TheorySection: React.FC<TheorySectionProps> = ({ question, officialTheory, onAdvance }) => {
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [showFullTheory, setShowFullTheory] = useState(false);

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    setIsSubmitting(true);
    const feedback = await evaluateTeamResponse(question, answer, officialTheory);
    setAiFeedback(feedback);
    setShowFullTheory(true);
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 shadow-sm">
        <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">🤔</span> Riflessione di Team
        </h3>
        <p className="text-indigo-800 text-lg font-medium leading-relaxed mb-6">
          {question}
        </p>
        
        {!showFullTheory ? (
          <div className="space-y-4">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Scrivete qui la vostra risposta collettiva..."
              className="w-full h-32 p-4 bg-white border-2 border-indigo-200 rounded-2xl outline-none focus:border-indigo-500 transition-all text-slate-700"
            />
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !answer.trim()}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Analisi in corso...
                </>
              ) : 'Invia e Scopri la Teoria'}
            </button>
          </div>
        ) : (
          <div className="bg-white/50 p-6 rounded-2xl border border-white mt-4 italic text-indigo-900 font-medium">
            <span className="font-bold block mb-1">Feedback del Coach:</span>
            {aiFeedback}
          </div>
        )}
      </div>

      {showFullTheory && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm animate-in fade-in zoom-in-95 duration-700">
          <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">📘</span> La Teoria QuickWorks
          </h3>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg mb-8">
            {officialTheory}
          </div>
          <button
            onClick={onAdvance}
            className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all"
          >
            Vai alla Verifica (Quiz/Simulazione)
          </button>
        </div>
      )}
    </div>
  );
};

export default TheorySection;
