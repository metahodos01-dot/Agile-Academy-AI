
import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleAnswer = (choiceIdx: number) => {
    const isCorrect = choiceIdx === questions[currentIdx].correctIndex;
    const currentAttempts = attempts + 1;

    if (isCorrect) {
      let points = 0;
      if (currentAttempts === 1) points = 10;
      else if (currentAttempts === 2) points = 7;
      else if (currentAttempts === 3) points = 4;
      
      setTotalScore(prev => prev + points);
      setFeedback({ type: 'success', text: `Corretto! +${points} punti.` });
      
      setTimeout(() => {
        if (currentIdx + 1 < questions.length) {
          setCurrentIdx(prev => prev + 1);
          setAttempts(0);
          setFeedback(null);
        } else {
          onComplete(totalScore + points);
        }
      }, 1500);
    } else {
      setAttempts(currentAttempts);
      setFeedback({ type: 'error', text: 'Riprova! Tentativo #' + currentAttempts });
    }
  };

  const q = questions[currentIdx];

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Domanda {currentIdx + 1} di {questions.length}</span>
        <span className="text-indigo-600 font-bold">Punti Totali: {totalScore}</span>
      </div>
      
      <h3 className="text-2xl font-bold text-slate-800 mb-8">{q.question}</h3>
      
      <div className="space-y-4">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            className="w-full text-left p-4 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all font-medium text-slate-700"
          >
            {opt}
          </button>
        ))}
      </div>

      {feedback && (
        <div className={`mt-6 p-4 rounded-xl text-center font-bold animate-bounce ${feedback.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
          {feedback.text}
        </div>
      )}
    </div>
  );
};

export default Quiz;
