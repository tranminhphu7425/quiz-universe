const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";




export async function fetchSubjectNameById(subjectId: number) {
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/subjects/${subjectId}/name`);
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
    }
    return res.json() as Promise<{ id: number; name: string }>;
}



export  type Subject = {
    id: number;
    code: string;
    name: string;
    description?: string;
    createdAt: string;
}



export async function fetchAllSubjects(signal?: AbortSignal): Promise<Subject[]> {


    const res = await fetch(`${API_BASE}/subjects`, { signal });

    // Nếu API lỗi → ném error để sang catch
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
    }

    const json = (await res.json()) as Subject[];
    return Array.isArray(json) ? (json as Subject[]) : [];

}
