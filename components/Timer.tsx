
import React, { useState, useEffect } from 'react';

interface TimerProps {
  initialMinutes: number;
  onTimeUp?: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialMinutes, onTimeUp }) => {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editMinutes, setEditMinutes] = useState(initialMinutes.toString());

  useEffect(() => {
    setSeconds(initialMinutes * 60);
    setEditMinutes(initialMinutes.toString());
    setIsActive(false);
    setIsEditing(false);
  }, [initialMinutes]);

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      clearInterval(interval);
      setIsActive(false);
      if (onTimeUp) onTimeUp();
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, onTimeUp]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const toggle = () => {
    if (isEditing) handleSaveEdit();
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setIsEditing(false);
    setSeconds(initialMinutes * 60);
    setEditMinutes(initialMinutes.toString());
  };

  const handleSaveEdit = () => {
    const mins = parseInt(editMinutes);
    if (!isNaN(mins) && mins >= 0) {
      setSeconds(mins * 60);
    }
    setIsEditing(false);
  };

  const adjustTime = (mins: number) => {
    setSeconds((prev) => Math.max(0, prev + mins * 60));
  };

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-3xl shadow-lg border border-slate-100 min-w-[280px]">
      <div className="flex items-center justify-center w-full mb-4">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={editMinutes}
              onChange={(e) => setEditMinutes(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
              autoFocus
              className="text-5xl font-mono font-bold text-slate-800 w-24 bg-slate-50 border-b-2 border-[#e95c7b] outline-none text-center"
            />
            <span className="text-2xl font-mono font-bold text-slate-400">min</span>
          </div>
        ) : (
          <div 
            onClick={() => !isActive && setIsEditing(true)}
            className={`text-6xl font-mono font-bold cursor-pointer transition-colors ${seconds < 60 ? 'text-[#e95c7b] animate-pulse' : 'text-slate-800'} hover:text-[#e95c7b]`}
          >
            {formatTime(seconds)}
          </div>
        )}
      </div>

      <div className="flex gap-4 w-full">
        <button 
          onClick={toggle}
          className={`flex-1 py-3 rounded-xl font-bold text-white transition-all shadow-md ${isActive ? 'bg-[#f9963f] hover:bg-[#e88b39]' : 'bg-[#70c174] hover:bg-[#5daf61]'} active:scale-95`}
        >
          {isActive ? 'Pausa' : 'Avvia'}
        </button>
        <button 
          onClick={reset}
          className="px-6 py-3 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95 transition-all"
        >
          Reset
        </button>
      </div>
      {!isActive && !isEditing && (
        <p className="text-[10px] text-slate-400 mt-3 uppercase tracking-widest font-bold">Clicca le cifre per modificare</p>
      )}
    </div>
  );
};

export default Timer;
