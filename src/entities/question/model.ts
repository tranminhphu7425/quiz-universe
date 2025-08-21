// Auto-generated
export interface Option {
  id: number;
  label: string;
  content: string;
  isCorrect: boolean;
  sortOrder: number;
}

export interface Question {
  id: number;
  stem: string;
  explanation: string;
  questionType: 'mcq_single' | 'mcq_multiple' | 'true_false' | 'short_answer';
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  options: Option[];
}

export type QuestionCreate = Omit<Question, 'id' | 'createdAt' | 'updatedAt'>;
export type QuestionUpdate = Partial<QuestionCreate>;

// Validation schema với Zod
import { z } from 'zod';

export const optionSchema = z.object({
  label: z.string().min(1, 'Nhãn không được để trống'),
  content: z.string().min(1, 'Nội dung đáp án không được để trống'),
  isCorrect: z.boolean(),
  sortOrder: z.number().min(0),
});

export const questionSchema = z.object({
  stem: z.string().min(1, 'Câu hỏi không được để trống'),
  explanation: z.string().optional(),
  questionType: z.enum(['mcq_single', 'mcq_multiple', 'true_false', 'short_answer']),
  status: z.enum(['draft', 'pending', 'approved', 'rejected']).optional(),
  options: z.array(optionSchema)
    .min(2, 'Cần ít nhất 2 đáp án')
    .refine((options) => options.some(opt => opt.isCorrect), {
      message: 'Cần ít nhất 1 đáp án đúng'
    })
    .refine((options) => {
      const singleChoiceTypes = ['mcq_single', 'true_false'];
      return !singleChoiceTypes.includes(questionSchema.shape.questionType._def.value) || 
             options.filter(opt => opt.isCorrect).length === 1;
    }, {
      message: 'Câu hỏi single choice chỉ được có 1 đáp án đúng'
    }),
});

export type QuestionFormData = z.infer<typeof questionSchema>;