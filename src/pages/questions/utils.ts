const BLANK_RE = /\.{5,}/g; // 6 dấu chấm trở lên

export type Segment =
  | { type: "text"; text: string }
  | { type: "blank" };

export function stemToSegments(stem: string): Segment[] {
  const segs: Segment[] = [];
  let lastIdx = 0;
  let m: RegExpExecArray | null;
  while ((m = BLANK_RE.exec(stem)) !== null) {
    const start = m.index;
    if (start > lastIdx) segs.push({ type: "text", text: stem.slice(lastIdx, start) });
    segs.push({ type: "blank" });
    lastIdx = start + m[0].length;
  }
  if (lastIdx < stem.length) segs.push({ type: "text", text: stem.slice(lastIdx) });
  // Nếu không có blank nào, trả về 1 text segment duy nhất
  return segs.length ? segs : [{ type: "text", text: stem }];
}

export function normalize(s: string) {
  return (s ?? "").trim().replace(/\s+/g, " ").toLowerCase();
}

export function deepClone<T>(x: T): T {
  return structuredClone ? structuredClone(x) : JSON.parse(JSON.stringify(x));
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export function autoLabel(idx: number) {
  return LETTERS[idx] || `Opt${idx + 1}`;
}
