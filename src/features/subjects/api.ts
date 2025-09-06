// Auto-generated
import { http } from "@/shared/api/http";
import { Subject } from "@/entities/subject/model";

export async function getAllSubjects(): Promise<Subject[]> {
  const res = await http.get<Subject[]>("/api/subjects");
  return res.data;
}
