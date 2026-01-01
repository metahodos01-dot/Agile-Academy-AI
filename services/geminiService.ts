
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAgileChallenge = async (pillar: string, role: string, specializedType?: string) => {
  try {
    let prompt = `Genera una sfida interattiva per un team di corso Agile. Focus: ${pillar}. Ruolo target: ${role}. Lingua: Italiano.`;
    
    if (specializedType === 'sacmi') {
      prompt += " Scenario Workshop SACMI: Progetto linea capsule cellulosa. Siete nella fase di definizione MVP. Genera una sfida di prioritizzazione strategica: 3 feature hardware critiche ma costose contro 2 feature software abilitanti. Chiedi al team di giustificare la scelta dell'MVP basandosi sul time-to-market di 18 mesi.";
    } else if (specializedType === 'silos') {
      prompt += " Crea un'attività chiamata 'Ponti di Silenzio'. L'obiettivo è abbattere i silos informativi tramite comunicazione non verbale.";
    } else if (specializedType === 'user-stories') {
      prompt += " Crea un contesto business e chiedi al team di scrivere 3 User Stories con AC specifici.";
    } else if (specializedType === 'scrum-lego') {
      prompt += " State costruendo una Città LEGO in 3 Sprint. La sfida è creare una Roadmap che bilanci Infrastrutture critiche e Feature di alto valore per i cittadini. Fornisci un obiettivo specifico per il primo Sprint.";
    }
    // Day 3 - Scrum Master
    else if (specializedType === 'sm-servant') {
      prompt += " Scenario: Un team si aspetta che tu prenda tutte le decisioni tecniche. Chiedi al team di proporre una tecnica di coaching per riportare l'autonomia ai Developers.";
    } else if (specializedType === 'sm-facilitation') {
      prompt += " Scenario: Una Retrospettiva è diventata una serie di lamentele sterili. Sfida il team a progettare un format di facilitazione energizzante.";
    } else if (specializedType === 'sm-conflict') {
      prompt += " Scenario: Due membri senior del team litigano apertamente sulla scelta di un framework. Chiedi al team di simulare una sessione di mediazione.";
    } else if (specializedType === 'sm-metrics') {
      prompt += " Fornisci dati fittizi: Lead Time in aumento, Velocity costante, Moodmeter in calo. Chiedi al team di analizzare le possibili cause e correlazioni.";
    }
    // Day 4 - Product Owner
    else if (specializedType === 'po-prior') {
      prompt += " Presenta 8 feature contrastanti. Chiedi al team di usare il modello Kano per decidere cosa prioritizzare per lo sprint dell'MVP.";
    } else if (specializedType === 'po-stake') {
      prompt += " Scenario: Uno stakeholder vuole cambiare il piano a metà sprint. Chiedi al team di negoziare usando il concetto di 'valore non fatto'.";
    } else if (specializedType === 'po-val-metrics') {
      prompt += " Scenario: Lancio di un prodotto. Chiedi al team di definire la 'North Star Metric' e come misurarla tramite Pirate Metrics.";
    } else if (specializedType === 'po-discovery') {
      prompt += " Sfida il team a progettare un esperimento 'Fake Door' per validare una nuova idea di servizio in meno di 24 ore.";
    } else {
      prompt += " La sfida deve essere pratica, breve e coinvolgente.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            difficulty: { type: Type.STRING, enum: ['Easy', 'Medium', 'Hard'] }
          },
          required: ["title", "description", "difficulty"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating challenge:", error);
    return null;
  }
};

export const evaluateSolutionWithCards = async (challenge: string, selectedCards: string[], solutionText: string) => {
  try {
    const prompt = `
      Agisci come un esperto Agile Coach MetàHodòs. 
      Sfida: "${challenge}"
      Carte selezionate dal team: ${selectedCards.join(', ')}
      Spiegazione del team: "${solutionText}"
      
      Valuta la strategia del team. Hanno bilanciato bene complessità e valore? Hanno costruito infrastrutture prima delle feature pesanti? 
      Rispondi in italiano. Usa 'APPROVATA' se la logica è solida, 'MIGLIORABILE' se ci sono rischi di debito tecnico o spreco.
      Sii breve e professionale (max 6 frasi).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    });
    return response.text;
  } catch (error) {
    return "MIGLIORABILE: Problema nell'analisi strategica delle carte.";
  }
};

export const evaluateSolutionWithImage = async (challenge: string, solutionText: string, imageBase64Array?: string[]) => {
  try {
    const parts: any[] = [
      { text: `Agisci come un esperto Agile Coach MetàHodòs. Valuta il lavoro di un team in corso.` },
      { text: `Sfida: "${challenge}"` },
      { text: `Riflessione: "${solutionText}"` }
    ];

    if (imageBase64Array && imageBase64Array.length > 0) {
      imageBase64Array.forEach((img) => {
        parts.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: img.split(',')[1] || img
          }
        });
      });
      parts.push({ text: "Analizza le foto (board, grafici, post-it, mappe di empatia). Nota differenze e analogie tra i lavori prodotti dai vari team/fasi." });
    }

    parts.push({ text: "Rispondi in italiano. Usa 'APPROVATA' o 'MIGLIORABILE'. Feedback breve e professionale (max 6 frasi)." });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts }
    });
    return response.text;
  } catch (error) {
    console.error("Evaluation error:", error);
    return "MIGLIORABILE: Problema tecnico nell'analisi.";
  }
};

export const askAgileCoach = async (question: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: question,
      config: {
        systemInstruction: "Sei un esperto Agile Coach MetàHodòs. Rispondi in italiano, conciso e pratico."
      }
    });
    return response.text;
  } catch (error) {
    return "Errore tecnico.";
  }
};

export const generateAIVisual = async (prompt: string) => {
  try {
    const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio: "1:1" } }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const evaluateTeamResponse = async (question: string, teamAnswer: string, officialTheory: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Coach feedback su: Domanda: "${question}", Risposta Team: "${teamAnswer}", Teoria: "${officialTheory}". Sii breve (3 frasi).`,
    });
    return response.text;
  } catch (error) {
    return "Ottima riflessione!";
  }
};
