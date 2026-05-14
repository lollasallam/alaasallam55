
export interface Question {
  id: number;
  text: string;
  isNegative?: boolean;
}

export interface Dimension {
  title: string;
  id: string;
  questions: Question[];
}

export type StudentResponse = 'always' | 'sometimes' | 'never' | null;

export interface DimensionScore {
  title: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface Submission {
  id: string;
  timestamp: string;
  studentName: string;
  grade: string;
  school: string;
  totalScore: number;
  maxTotalScore: number;
  dimensionScores: DimensionScore[];
  responses: Record<number, StudentResponse>;
}

export interface SurveyState {
  studentName: string;
  grade: string;
  school: string;
  responses: Record<number, StudentResponse>;
}
