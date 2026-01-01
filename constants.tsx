
import { PillarType, Module, UserRole, ProductCard } from './types';

export const PILLARS_DESCRIPTION = {
  [PillarType.MVP]: "Visione chiara, obiettivi condivisi e rilascio rapido per raccogliere feedback immediato.",
  [PillarType.ITERATIVE]: "Cicli brevi (Sprint) per adattamento rapido e visibilità costante dei risultati.",
  [PillarType.OBEYA]: "Spazio di trasparenza totale per monitoraggio e risoluzione rapida dei problemi.",
  [PillarType.AUTONOMY]: "Team multidisciplinari 'alla pari' con libertà decisionale e figure di bilanciamento (PO/SM).",
  [PillarType.MANAGEMENT]: "Flusso continuo verso lo Steering Committee per decisioni strategiche informate.",
  [PillarType.FAIL_SAFE]: "Il fallimento rapido è un'opportunità di apprendimento, celebrato nelle Retrospective."
};

export interface NutshellItem {
  id: string;
  title: string;
  agile: string;
  waterfall: string;
  icon: string;
  description: string;
}

export const AGILE_NUTSHELL_DATA: NutshellItem[] = [
  { id: 'req', title: 'Requisiti', icon: '📝', agile: 'Iterativi e Just-in-time', waterfall: 'Tutti definiti all\'inizio', description: 'In Agile i requisiti evolvono con il feedback, in Waterfall sono scolpiti nella pietra.' },
  { id: 'lead', title: 'Leadership', icon: '👑', agile: 'Servant Leadership (Orizzontale)', waterfall: 'Comando e Controllo (Piramide)', description: 'Il leader Agile serve il team rimuovendo ostacoli, il leader Waterfall dirige le attività.' },
  { id: 'meet', title: 'Meetings', icon: '👥', agile: 'Brevi e Frequenti (Daily)', waterfall: 'Lunghi e Sporadici', description: 'Allineamento continuo vs riunioni fiume di stato avanzamento.' },
  { id: 'vincoli', title: 'Vincoli', icon: '📐', agile: 'Tempo/Costi Fissi, Ambito Variabile', waterfall: 'Ambito Fisso, Tempo/Costi Variabili', description: 'Il triangolo dei vincoli si inverte per garantire la qualità e il rilascio.' },
  { id: 'client', title: 'Cliente', icon: '🤝', agile: 'Collaborazione Costante', waterfall: 'Solo all\'inizio e alla fine', description: 'Il cliente è parte del team Agile, in Waterfall è un osservatore esterno.' },
  { id: 'deliv', title: 'Delivery', icon: '🚗', agile: 'Evolutiva (Skateboard -> Auto)', waterfall: 'Big Bang (Pezzi -> Auto)', description: 'Rilasciare valore subito vs aspettare la fine per vedere qualcosa di usabile.' },
  { id: 'team', title: 'Teamwork', icon: '🧬', agile: 'Multidisciplinare e Collaborativo', waterfall: 'Silos e Passaggi di mano', description: 'Collaborazione vs Hand-over tra reparti isolati.' },
  { id: 'skills', title: 'Skills', icon: '🏗️', agile: 'T-Shaped (Generalista Specializzato)', waterfall: 'I-Shaped (Iper-specialista)', description: 'Flessibilità e competenze trasversali vs compartimenti stagni.' },
  { id: 'change', title: 'Modifiche', icon: '🔄', agile: 'Benvenute (Opportunità)', waterfall: 'Evitate (Costo/Rischio)', description: 'Abbracciare il cambiamento vs temerlo.' },
  { id: 'approach', title: 'Approccio', icon: '🚜', agile: 'Pull (Tirato dal valore)', waterfall: 'Push (Spinto dal piano)', description: 'Lavorare su ciò che serve vs lavorare su ciò che è stato pianificato mesi prima.' },
];

export const SACMI_STORY_CARDS = [
  { id: 's1', text: "Come operatore voglio poter caricare la cellulosa in modo sicuro per evitare infortuni.", value: 'Alto', complexity: 5 },
  { id: 's2', text: "Come responsabile qualità voglio misurare lo spessore delle capsule in tempo reale.", value: 'Critico', complexity: 8 },
  { id: 's3', text: "Come manutentore voglio accedere ai componenti critici senza fermare la linea.", value: 'Medio', complexity: 13 },
  { id: 's4', text: "Come process engineer voglio regolare la temperatura di stampaggio tramite touch screen.", value: 'Alto', complexity: 3 },
  { id: 's5', text: "Come cliente voglio che il prodotto sia certificato per uso alimentare 100%.", value: 'Critico', complexity: 2 },
  { id: 's6', text: "Come CFO voglio monitorare il consumo energetico per capsula prodotta.", value: 'Basso', complexity: 5 },
  { id: 's7', text: "Come software engineer voglio un sistema di tele-assistenza per il debug remoto.", value: 'Medio', complexity: 8 },
];

export const LEGO_CITY_CARDS: ProductCard[] = [
  { id: 'c1', name: 'Centrale Elettrica', type: 'Infrastructure', value: 50, complexity: 8, description: 'Necessaria per sbloccare tutti gli edifici residenziali.', icon: '⚡' },
  { id: 'c2', name: 'Case Popolari', type: 'Feature', value: 20, complexity: 3, description: 'Aumenta la popolazione rapidamente.', icon: '🏘️' },
  { id: 'c3', name: 'Ospedale', type: 'Quality', value: 100, complexity: 13, description: 'Garantisce la sicurezza della città.', icon: '🏥' },
  { id: 'c4', name: 'Parco Pubblico', type: 'Feature', value: 15, complexity: 2, description: 'Migliora il mood dei cittadini.', icon: '🌳' },
  { id: 'c5', name: 'Rete Fognaria', type: 'Infrastructure', value: 40, complexity: 5, description: 'Evita crisi sanitarie impreviste.', icon: '🚽' },
  { id: 'c6', name: 'Grattacielo Uffici', type: 'Feature', value: 80, complexity: 8, description: 'Genera alto valore economico.', icon: '🏢' },
  { id: 'c7', name: 'Centro Ricerca', type: 'Quality', value: 60, complexity: 5, description: 'Riduce la complessità dei futuri edifici.', icon: '🧪' },
  { id: 'c8', name: 'Vigili del Fuoco', type: 'Quality', value: 30, complexity: 3, description: 'Protegge dai rischi di incendio.', icon: '🚒' },
  { id: 'c9', name: 'Stazione Polizia', type: 'Quality', value: 30, complexity: 3, description: 'Mantiene l\'ordine pubblico.', icon: '🚓' },
  { id: 'c10', name: 'Scuola Materna', type: 'Feature', value: 25, complexity: 2, description: 'Servizio essenziale per le famiglie.', icon: '👶' },
];

export const COURSE_MODULES: Module[] = [
  {
    id: 'm0',
    day: 1,
    title: 'Agile Foundations: Rompere i Silos',
    description: 'Esercizio interattivo sulla comunicazione per abbattere le barriere informative.',
    pillar: PillarType.ITERATIVE,
    game: 'Connessioni Veloci (Ponti di Silenzio)',
    durationMinutes: 45,
    openQuestion: "Qual è stato il momento esatto in cui avete capito che l'assenza di comunicazione verbale stava creando un 'silos' informativo?",
    content: "Affrontiamo il problema numero uno delle aziende: i silos. Usiamo la comunicazione non verbale per simulare la difficoltà di allineamento.",
    detailedTheory: "L'Agile nasce per abbattere i silos. In MetàHodòs, interpretiamo l'Agile come la capacità di ridurre radicalmente il lead time tra un'idea e il suo feedback. I silos nascono quando le informazioni non fluiscono liberamente tra i reparti.",
    eventDebrief: "L'evento 'Connessioni Veloci' ci insegna che la comunicazione diretta batte qualsiasi workflow complesso.",
    quiz: [
      { question: "Qual è la causa principale dei silos informativi?", options: ["Mancanza di software", "Mancanza di trasparenza e comunicazione diretta", "Troppo budget", "Poca documentazione"], correctIndex: 1 }
    ]
  },
  {
    id: 'm-fail-safe',
    day: 1,
    title: 'Il Museo dei Fallimenti Brillanti',
    description: 'Celebrare l\'apprendimento rapido attraverso il fallimento.',
    pillar: PillarType.FAIL_SAFE,
    game: 'Torre di Marshmallow',
    durationMinutes: 60,
    openQuestion: "Perché chi fallisce più volte nei primi 10 minuti di gioco solitamente costruisce la torre più alta alla fine?",
    content: "Il fallimento non è l'opposto del successo, ma una sua componente necessaria. La cultura Fail Safe incoraggia la sperimentazione sicura.",
    detailedTheory: "In MetàHodòs, il fallimento è un dato: ci dice cosa non funziona. Più velocemente falliamo, meno spendiamo per correggere la rotta. La torre di marshmallow dimostra che pianificare troppo senza testare i materiali (gli spaghetti) porta al crollo finale.",
    eventDebrief: "La torre ci insegna che il 'Business Case' perfetto non sopravvive al primo contatto con la realtà fisica.",
    quiz: [
      { question: "Cosa si impara dalla Torre di Marshmallow?", options: ["Pianificare tutto subito", "L'importance del feedback continuo e della prototipazione", "Usare più colla", "Che gli ingegneri sono i migliori"], correctIndex: 1 }
    ]
  },
  {
    id: 'm-autonomy',
    day: 1,
    title: 'Autonomia & Team Multidisciplinari',
    description: 'Team stabili e alla pari per massimizzare la velocità.',
    pillar: PillarType.AUTONOMY,
    game: 'Il Puzzle',
    durationMinutes: 45,
    openQuestion: "Se ognuno avesse solo i propri pezzi del puzzle e non potesse vedere quelli degli altri, quanto tempo servirebbe per finire?",
    content: "L'autonomia fiorisce quando eliminiamo i passaggi di mano (handover) tra reparti diversi.",
    detailedTheory: "Un team agile deve essere 'cross-functional'. Questo significa avere tutte le competenze (Design, Dev, Test, Business) all'interno dello stesso gruppo di 5-9 persone.",
    eventDebrief: "Il puzzle dimostra che l'auto-organizzazione supera la pianificazione centralizzata.",
    quiz: [
      { question: "Chi decide come fare il lavoro nello Sprint?", options: ["Il Manager", "Lo Scrum Master", "Il Team multidisciplinare", "Il Cliente"], correctIndex: 2 }
    ]
  },
  {
    id: 'm-us',
    day: 1,
    title: 'User Stories & Criteri di Accettazione',
    description: 'Scrivere requisiti dal punto di vista dell\'utente.',
    pillar: PillarType.MVP,
    game: 'Esercitazione: Trasforma il Requisito',
    durationMinutes: 45,
    openQuestion: "Come cambierebbe il vostro lavoro se ogni task avesse un 'Perché' orientato all'utente invece di un comando tecnico?",
    content: "User Stories (INVEST) e Criteri di Accettazione per eliminare l'ambiguità.",
    detailedTheory: "La User Story è una promessa di conversazione. Serve a focalizzare il valore invece della feature.",
    eventDebrief: "Scrivere storie chiare riduce drasticamente i 'non ho capito' durante lo sviluppo.",
    quiz: [
      { question: "Cosa definisce quando una User Story è completa?", options: ["Il tempo impiegato", "I Criteri di Accettazione", "Il numero di righe di codice", "La firma del PO"], correctIndex: 1 }
    ]
  },
  {
    id: 'm-vision-mvp',
    day: 2,
    title: 'Vision & MVP',
    description: 'Definire il valore minimo rilasciabile per validare la strategia.',
    pillar: PillarType.MVP,
    game: 'Gioco Aerei di Carta',
    durationMinutes: 60,
    openQuestion: "Qual è il 'volo minimo' che valida la vostra capacità di costruire un aereo performante?",
    content: "Focalizzarsi sul core value. L'MVP non è un prodotto incompleto, ma il primo passo di una visione ambiziosa.",
    detailedTheory: "In MetàHodòs, l'MVP serve ad accorciare il loop di feedback. Se non rilasci, non impari. Se non impari, stai solo indovinando.",
    eventDebrief: "Lanciare l'aereo subito è l'unico modo per scoprire se le ali sono bilanciate.",
    quiz: [
      { question: "Qual è lo scopo principale dell'MVP?", options: ["Risparmiare soldi", "Rilasciare valore e imparare dal mercato il prima possibile", "Sostituire il prodotto finale", "Confondere i competitor"], correctIndex: 1 }
    ]
  },
  {
    id: 'm4',
    day: 2,
    title: 'Sviluppo Iterativo & Scrum',
    description: 'Simulazione completa di un flusso di lavoro Scrum.',
    pillar: PillarType.ITERATIVE,
    game: 'Simulazione Scrum (LEGO)',
    durationMinutes: 120,
    scrumInfo: true,
    openQuestion: "Come cambia l'umore del team quando si vede un incremento reale ad ogni Sprint invece di una promessa a 6 mesi?",
    content: 'Pianificazione, Daily, Review e Retrospettiva. Costruiamo prodotti reali.',
    detailedTheory: "Scrum è il framework per gestire la complessità. Si basa su empirismo: trasparenza, ispezione e adattamento.",
    eventDebrief: "Costruire in Sprint ha reso visibile il progresso e ha permesso di correggere gli errori subito.",
    quiz: [
      { question: "Quale evento serve per allinearsi ogni giorno?", options: ["Sprint Review", "Daily Scrum", "Sprint Planning", "Retrospective"], correctIndex: 1 }
    ]
  },
  {
    id: 'm5',
    day: 2,
    title: 'Obeya Room & Trasparenza',
    description: 'Spazio per il monitoraggio e gestione visiva del flusso.',
    pillar: PillarType.OBEYA,
    game: 'Simulazione Kanban',
    durationMinutes: 60,
    openQuestion: "Se la dashboard fosse l'unico posto dove guardare per capire se il progetto fallirà, cosa vorreste vederci?",
    content: 'Trasparenza totale (Obeya) per risolvere i problemi non appena si presentano.',
    detailedTheory: "La trasparenza riduce l'ansia. Quando tutti sanno tutto, nessuno deve chiedere permessi per agire sui blocchi.",
    eventDebrief: "Visualizzare il lavoro 'invisibile' è il primo passo per ottimizzare il Lead Time.",
    quiz: [
      { question: "A cosa serve una Board Kanban?", options: ["A far vedere che lavoriamo", "A visualizzare il flusso e limitare il WIP", "A rimpiazzare il manager", "A decorare l'ufficio"], correctIndex: 1 }
    ]
  },
  {
    id: 'm6',
    day: 2,
    title: 'Comunicazione Strategica',
    description: 'Allineamento tra team e management.',
    pillar: PillarType.MANAGEMENT,
    game: 'Roleplay Steering Committee',
    durationMinutes: 60,
    openQuestion: "Perché è fondamentale che lo Steering Committee veda la realtà del team e non un report 'abbellito'?",
    content: 'Parlare la lingua del business usando le metriche dell\'agilità.',
    detailedTheory: "Il Management non deve controllare i task, ma abilitare il team rimuovendo ostacoli organizzativi.",
    eventDebrief: "Abbiamo imparato a chiedere aiuto al management invece di nascondere i problemi.",
    quiz: [
      { question: "Cosa dovrebbe guardare lo Steering Committee?", options: ["I singoli post-it", "La velocità e il valore rilasciato", "L'orario di timbratura", "Le ferie del team"], correctIndex: 1 }
    ]
  },
  {
    id: 'm-sacmi',
    day: 2,
    title: 'Workshop: Da Zero a MVP - Il Caso SACMI',
    description: 'Simulazione intensiva di un progetto hardware reale: linea produzione capsule cellulosa.',
    pillar: PillarType.MVP,
    game: 'Simulazione Strategica SACMI',
    durationMinutes: 180,
    openQuestion: "In un contesto hardware complesso come SACMI, quale compromesso tra 'perfetto' e 'pronto' è il più difficile da accettare per un ingegnere?",
    content: "Dalla Vision allo Sprint 0. Affrontiamo vincoli di budget, certificazioni alimentari e sostenibilità in un mercato competitivo.",
    detailedTheory: "Il caso SACMI è l'emblema dell'Agile applicato all'hardware. Dimostra che anche con cicli di produzione fisici lunghi, la mentalità MVP (Minimum Viable Product) può ridurre i tempi di validazione di mercato del 50%.",
    eventDebrief: "L'Agile nell'hardware non significa cambiare il pezzo di ferro ogni giorno, ma cambiare la strategia di validazione ogni Sprint.",
    quiz: [
      { question: "Qual è la sfida principale del progetto SACMI presentato?", options: ["Mancanza di personale", "Bilanciare complessità hardware e velocità di validazione MVP", "Il colore della linea", "Le ferie degli operai"], correctIndex: 1 }
    ]
  },
  {
    id: 'm-sm-servant',
    day: 3,
    title: 'Servant Leadership & Coaching',
    description: 'Il ruolo dello Scrum Master come leader al servizio del team.',
    pillar: PillarType.AUTONOMY,
    game: 'Simulation: Coaching Circles',
    roleSpecific: UserRole.SCRUM_MASTER,
    durationMinutes: 90,
    openQuestion: "Qual è il confine tra essere un Servant Leader e diventare il 'segretario' del team?",
    content: "Leadership non gerarchica e tecniche di coaching per l'autonomia.",
    detailedTheory: "Lo SM protegge il team dalle interferenze e facilita il miglioramento continuo senza imporre soluzioni.",
    eventDebrief: "Abbiamo sperimentato come l'ascolto attivo sblocchi soluzioni interne al team.",
    quiz: [
      { question: "Qual è la priorità dello Scrum Master?", options: ["Scrivere le User Stories", "Abilitare il team a performare al meglio", "Assegnare i task ai Developers", "Parlare con i clienti"], correctIndex: 1 }
    ]
  },
  {
    id: 'm-sm-facilitation',
    day: 3,
    title: 'Facilitazione Avanzata',
    description: 'Tecniche per rendere gli eventi Scrum produttivi.',
    pillar: PillarType.ITERATIVE,
    game: 'Workshop Design: The Perfect Retro',
    roleSpecific: UserRole.SCRUM_MASTER,
    durationMinutes: 90,
    openQuestion: "Se una riunione finisce senza una decisione o un'azione, che valore ha generato?",
    content: "Liberating Structures e tecniche di coinvolgimento totale.",
    detailedTheory: "Facilitare significa rimuovere l'attrito dalla collaborazione umana.",
    eventDebrief: "Progettare una Retrospettiva efficace cambia il clima dello Sprint successivo.",
    quiz: [
      { question: "Cosa significa Timeboxing?", options: ["Mettere i task in scatole", "Definire un tempo massimo non superabile per un evento", "Controllare l'orario di ingresso", "Lavorare più velocemente"], correctIndex: 1 }
    ]
  },
  {
    id: 'm-sm-conflict',
    day: 3,
    title: 'Gestione Conflitti',
    description: 'Trasformare la tensione in opportunità.',
    pillar: PillarType.FAIL_SAFE,
    game: 'Simulation: Conflict Roleplay',
    roleSpecific: UserRole.SCRUM_MASTER,
    durationMinutes: 90,
    openQuestion: "Come si passa dal 'Cerca Colpevole' al 'Cerca Soluzione' durante una crisi?",
    content: "Feedback costruttivo e intelligenza emotiva nel team.",
    detailedTheory: "In MetàHodòs usiamo il conflitto come segnale di divergenza su obiettivi che vanno chiariti.",
    eventDebrief: "Gestire il disaccordo apertamente previene il debito emotivo nel team.",
    quiz: [
      { question: "In una discussione accesa, lo SM cosa dovrebbe fare?", options: ["Zittire tutti", "Scegliere un vincitore", "Facilitare l'ascolto dei diversi punti di vista", "Uscire dalla stanza"], correctIndex: 2 }
    ]
  },
  {
    id: 'm-sm-metrics',
    day: 3,
    title: 'Metriche Team & Rendimento',
    description: 'Misurare per migliorare il flusso.',
    pillar: PillarType.OBEYA,
    game: 'Metrics Lab: Board Analysis',
    roleSpecific: UserRole.SCRUM_MASTER,
    durationMinutes: 90,
    openQuestion: "Quale metrica vi direbbe subito se il team sta lavorando troppo rispetto alla propria capacità reale?",
    content: "Burndown, Lead Time, Moodmeter e Throughput.",
    detailedTheory: "Le metriche sono per il team. Servono a rendersi conto della realtà oggettiva oltre la percezione soggettiva.",
    eventDebrief: "Analizzare il Lead Time ci ha mostrato dove il valore 'ristagna' nel processo.",
    quiz: [
      { question: "Cosa mostra un Burndown Chart?", options: ["Il budget rimasto", "Il lavoro rimanente verso l'obiettivo dello Sprint", "La velocità del server", "Le ore di sonno perse"], correctIndex: 1 }
    ]
  },
  {
    id: 'm-po-prior',
    day: 4,
    title: 'Tecniche di Prioritizzazione',
    description: 'Decidere cosa costruire per massimizzare il ROI.',
    pillar: PillarType.MVP,
    game: 'Prioritization Battle: MoSCoW vs WSJF',
    roleSpecific: UserRole.PRODUCT_OWNER,
    durationMinutes: 90,
    openQuestion: "Se tutto è urgente, cosa è veramente prioritario?",
    content: "MoSCoW, WSJF, Value vs Effort, Kano Model.",
    detailedTheory: "Il PO deve saper tagliare tutto ciò che non contribuisce direttamente all'obiettivo dello Sprint.",
    eventDebrief: "Usare il modello Kano ci ha aiutato a distinguere tra 'bisogni' e 'desideri'.",
    quiz: [
      { question: "Cosa significa WSJF?", options: ["Weighted Shortest Job First", "Weekly Sprint Just Fast", "Work Simple Just Flow", "Winner Select Joint Force"], correctIndex: 0 }
    ]
  },
  {
    id: 'm-po-stake',
    day: 4,
    title: 'Stakeholder Management',
    description: 'Negoziare e gestire le aspettative.',
    pillar: PillarType.MANAGEMENT,
    game: 'The Negotiation Table: Say No',
    roleSpecific: UserRole.PRODUCT_OWNER,
    durationMinutes: 90,
    openQuestion: "Qual è il costo di un 'Sì' detto solo per compiacere uno stakeholder senza avere capacità produttiva?",
    content: "Mappatura stakeholder e tecniche di negoziazione win-win.",
    detailedTheory: "Il PO non è un passacarte, è un filtro che protegge il valore del prodotto.",
    eventDebrief: "Dire 'No' in modo costruttivo è la competenza più preziosa di un PO.",
    quiz: [
      { question: "Come dovrebbe comportarsi il PO con uno stakeholder?", options: ["Prendere ordini", "Collaborare e negoziare basandosi sui dati di valore", "Evitarlo", "Dargli sempre ragione"], correctIndex: 1 }
    ]
  },
  {
    id: 'm-po-val-metrics',
    day: 4,
    title: 'Metriche di Valore',
    description: 'Misurare il successo del prodotto.',
    pillar: PillarType.MVP,
    game: 'Value Lab: North Star Metric',
    roleSpecific: UserRole.PRODUCT_OWNER,
    durationMinutes: 90,
    openQuestion: "Se rilasciate 10 feature ma nessuna viene usata, qual è la vostra Velocity reale di valore?",
    content: "OKR, North Star Metric e Pirate Metrics (AARRR).",
    detailedTheory: "Misuriamo l'outcome (risultato di business), non solo l'output (quantità di codice).",
    eventDebrief: "La North Star Metric ci dà una direzione chiara in mezzo a mille KPI.",
    quiz: [
      { question: "Cosa misurano gli OKR?", options: ["Le ore lavorate", "Obiettivi e Risultati Chiave di business", "I bug del sistema", "Le riunioni fatte"], correctIndex: 1 }
    ]
  },
  {
    id: 'm-po-discovery',
    day: 4,
    title: 'Product Discovery',
    description: 'Validare le ipotesi prima dello sviluppo.',
    pillar: PillarType.MVP,
    game: 'Discovery Sprint: A/B Concept Test',
    roleSpecific: UserRole.PRODUCT_OWNER,
    durationMinutes: 90,
    openQuestion: "Perché costruire un prototipo di carta prima di scrivere una riga di codice?",
    content: "Interviste, prototipazione e test rapidi.",
    detailedTheory: "La Discovery riduce il rischio di costruire il prodotto sbagliato.",
    eventDebrief: "Fallire in Discovery costa ore, fallire in Delivery costa mesi.",
    quiz: [
      { question: "Qual è l'output di una buona Discovery?", options: ["Un documento di 100 pagine", "Conoscenza validata e incertezza ridotta", "Un software finito", "Un nuovo logo"], correctIndex: 1 }
    ]
  }
];
