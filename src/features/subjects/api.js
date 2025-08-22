// Auto-generated
import { http } from "@/shared/api/http";
export async function getAllSubjects() {
    const res = await http.get("/api/subjects");
    return res.data;
}
