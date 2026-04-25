export interface Exam {
  examId: number;
  title: string;
  subjectId: number;
  durationMin: number;
  totalMarks: number;
  createdBy?: string; // UUID
  createdAt: string;
  notes?: string;
}

export interface ExamSection {
  sectionId: number;
  examId: number;
  name: string;
  instructions?: string;
  weight: number;
}

export interface ExamQuestion {
  eqId: number;
  examId: number;
  sectionId?: number;
  questionId: number;
  points: number;
  displayOrder: number;
  shuffleOptions: boolean;
}
