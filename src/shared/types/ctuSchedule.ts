export interface CtuSchedule {
  id: number;
  userId: string;
  dataJson: string; // Or any type if parsed
  createdAt: string;
  updatedAt?: string;
}
