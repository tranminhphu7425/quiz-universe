// src/api/types/subject.ts
// export interface Subject {
//   subjectId: number;
//   code: string;
//   name: string;
//   description?: string;
//   createdAt: string;
// }

export interface SubjectOption {
  value: number;
  label: string;
  code: string;
}



export type Subject = {
  id: number;
  code: string;
  name: string;
  description?: string;
  createdAt: string;
};


export type SubjectNameResponse = {
  id: number;
  name: string;
};