
import { createClient } from '@supabase/supabase-js';
import { TrainingSession } from '../types';

// Credenziali fornite dall'utente per il progetto uyxstffidgfixdlminft
const supabaseUrl = 'https://uyxstffidgfixdlminft.supabase.co';
const supabaseKey = 'sb_publishable_SLyOaC8BhjlnvgArAMg3Ug_giYJF_69';

const supabase = createClient(supabaseUrl, supabaseKey);

export const saveSession = async (sessionData: TrainingSession) => {
  try {
    const { data, error } = await supabase
      .from('training_sessions')
      .insert([
        {
          team_name: sessionData.team_name,
          total_points: sessionData.total_points,
          role: sessionData.role,
          badges_count: sessionData.badges_count,
          summary_data: sessionData.summary_data,
          attendees: sessionData.attendees,
          session_date: sessionData.session_date,
          edition: sessionData.edition,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) throw error;
    
    console.log("Sessione salvata con successo su Supabase:", data);
    return { data, error: null };
  } catch (error: any) {
    console.warn("Errore nel salvataggio su Supabase. Provo il fallback su localStorage.", error.message);
    
    // Fallback su localStorage in caso di errore o tabella mancante
    const sessions = JSON.parse(localStorage.getItem('agile_sessions') || '[]');
    const localSession = { 
      ...sessionData, 
      id: 'local_' + Date.now().toString(), 
      created_at: new Date().toISOString(),
      sync_status: 'pending'
    };
    sessions.push(localSession);
    localStorage.setItem('agile_sessions', JSON.stringify(sessions));
    
    return { data: localSession, error: error.message };
  }
};

export const getSessions = async () => {
  try {
    const { data, error } = await supabase
      .from('training_sessions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.warn("Impossibile recuperare sessioni da Supabase, carico locali.");
    return JSON.parse(localStorage.getItem('agile_sessions') || '[]');
  }
};
