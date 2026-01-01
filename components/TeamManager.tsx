
import React, { useState } from 'react';
import { Team } from '../types';

interface TeamManagerProps {
  onTeamsUpdate: (teams: Team[]) => void;
  onSelectTeam: (id: string) => void;
  selectedTeamId: string | null;
}

const TeamManager: React.FC<TeamManagerProps> = ({ onTeamsUpdate, onSelectTeam, selectedTeamId }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeamName, setNewTeamName] = useState('');

  const addTeam = () => {
    if (!newTeamName.trim()) return;
    const team: Team = {
      id: Math.random().toString(36).substr(2, 9),
      name: newTeamName,
      points: 0,
      badges: []
    };
    const updated = [...teams, team];
    setTeams(updated);
    onTeamsUpdate(updated);
    setNewTeamName('');
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input 
          type="text" 
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
          placeholder="Nome team..."
          className="flex-1 bg-slate-800 border-none rounded-xl py-2 px-3 text-xs font-medium focus:ring-1 focus:ring-indigo-500 outline-none"
        />
        <button 
          onClick={addTeam}
          className="bg-indigo-600 text-white px-3 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700"
        >
          +
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Team Attivi</label>
        {teams.map(team => (
          <button
            key={team.id}
            onClick={() => onSelectTeam(team.id)}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
              selectedTeamId === team.id ? 'bg-indigo-600/20 ring-1 ring-indigo-500' : 'bg-slate-800/30'
            }`}
          >
            <div className="text-left">
              <div className={`text-xs font-bold ${selectedTeamId === team.id ? 'text-indigo-400' : 'text-slate-300'}`}>{team.name}</div>
              <div className="text-[10px] text-slate-500">{team.points} Punti</div>
            </div>
            {selectedTeamId === team.id && <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeamManager;
