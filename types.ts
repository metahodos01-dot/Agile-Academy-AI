
export enum UserRole {
  SCRUM_MASTER = 'Scrum Master',
  PRODUCT_OWNER = 'Product Owner',
  TRAINER = 'Trainer'
}

export enum PillarType {
  MVP = 'Approccio MVP',
  ITERATIVE = 'Sviluppo Iterativo',
  OBEYA = 'Obeya Room',
  AUTONOMY = 'Autonomia & Team Stabili',
  MANAGEMENT = 'Comunicazione Management',
  FAIL_SAFE = 'Cultura Fail Safe'
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  moduleTitle: string;
}

export interface ProductCard {
  id: string;
  name: string;
  type: 'Feature' | 'Infrastructure' | 'Crisis' | 'Quality';
  value: number;
  complexity: number;
  description: string;
  icon: string;
}

export interface Module {
  id: string;
  day: number;
  title: string;
  description: string;
  pillar: PillarType;
  game: string;
  durationMinutes: number;
  content: string; 
  detailedTheory: string; 
  openQuestion: string; 
  eventDebrief: string; 
  roleSpecific?: UserRole;
  quiz?: QuizQuestion[];
  scrumInfo?: boolean;
}

export interface Team {
  id: string;
  name: string;
  points: number;
  badges: Badge[];
}

export interface Attendee {
  name: string;
  teamName: string;
}

export interface TrainingSession {
  id?: string;
  created_at?: string;
  team_name: string;
  total_points: number;
  role: string;
  badges_count: number;
  summary_data: any;
  attendees: Attendee[];
  session_date: string;
  edition: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}
