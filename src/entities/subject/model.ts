// Auto-generated
export interface Subject {
  id: number;
  code: string;
  name: string;
  description: string;
  createdAt: string; // hoặc Date nếu bạn convert
}

export type SubjectCreate = Omit<Subject, 'id' | 'createdAt'>;
export type SubjectUpdate = Partial<SubjectCreate>;

// Optional: Validation schema với Zod
import { z } from 'zod';

export const subjectSchema = z.object({
  code: z.string()
    .min(1, 'Mã môn học không được để trống')
    .max(20, 'Mã môn học không quá 20 ký tự')
    .regex(/^[A-Z0-9]+$/, 'Mã môn học chỉ chứa chữ hoa và số'),
  name: z.string()
    .min(1, 'Tên môn học không được để trống')
    .max(100, 'Tên môn học không quá 100 ký tự'),
  description: z.string()
    .max(500, 'Mô tả không quá 500 ký tự')
    .optional()
    .or(z.literal('')),
});

export type SubjectFormData = z.infer<typeof subjectSchema>;