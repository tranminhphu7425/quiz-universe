
export interface University {
  universityCode: string;
  universityName: string;
}

export interface Major {
  majorId: number;
  majorName: string;
}

export async function fetchUniversities(): Promise<University[]> {
  const res = await fetch("/api/universities");
  if (!res.ok) throw new Error("Lỗi khi lấy danh sách trường");
  return res.json();
}

export async function fetchMajors(): Promise<Major[]> {
  const res = await fetch("/api/majors");
  if (!res.ok) throw new Error("Lỗi khi lấy danh sách ngành");
  return res.json();
}
