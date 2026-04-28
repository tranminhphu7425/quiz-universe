export interface Subject {
  subjectId: number;
  code: string;
  name: string;
  description?: string;
  credit?: number;
  createdAt: string;
  createdBy?: string;
  bankCount?: number;
}

export interface SubjectOption {
  value: number;
  label: string;
  code: string;
}

export type SubjectNameResponse = {
  id: number;
  name: string;
};