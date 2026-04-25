export interface Topic {
  topicId: number;
  subjectId: number;
  parentId?: number;
  code?: string;
  name: string;
  description?: string;
  sortOrder: number;
}
