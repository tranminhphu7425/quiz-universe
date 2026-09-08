import { ReactNode } from "react";

export type UserLearningStats = {
  totalQuestions: number;
  completedSets: number;
  totalStudyTime: number;
  accuracy: number;
  streak: number;
  level: number;
  xp: number;
};

export type RecentActivity = {
  id: number;
  type: 'practice' | 'create' | 'favorite' | 'complete';
  title: string;
  description: string;
  subjectName?: string;
  timestamp: string;
  icon: ReactNode;
  color: string;
};
