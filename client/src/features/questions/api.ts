import { http } from "@/shared/api/http";
import { Question } from "@/entities/question/model";

export async function getQuestionsBySubjectId(subjectId: number): Promise<Question[]> {
  const res = await http.get<Question[]>(`/api/questions/subject/${subjectId}`);
  return res.data;
}
