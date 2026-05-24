import type { HaikuRecord, HaikuMeta } from "@/types/haiku";

export async function fetchHaiku(): Promise<HaikuRecord[]> {
  const res = await fetch("/data/haiku.json", { cache: "no-store" });
  if (!res.ok) throw new Error("俳句データの読み込みに失敗しました");
  return res.json();
}

export async function fetchMeta(): Promise<HaikuMeta> {
  const res = await fetch("/data/meta.json", { cache: "no-store" });
  if (!res.ok) throw new Error("メタデータの読み込みに失敗しました");
  return res.json();
}
