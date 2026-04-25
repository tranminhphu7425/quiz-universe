export type SourceType = 'document' | 'external_bank' | 'webpage' | 'manual';

export interface Source {
  sourceId: number;
  sourceType: SourceType;
  title: string;
  origin?: string;
  filePath?: string;
  notes?: string;
  createdBy?: string; // UUID
  createdAt: string;
}

export interface SourceSection {
  sectionId: number;
  sourceId: number;
  label?: string;
  title?: string;
  pageStart?: number;
  pageEnd?: number;
}
