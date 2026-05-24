"use client";

import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "katsuragi_favorites";

function loadIds(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as number[];
  } catch {
    return [];
  }
}

function saveIds(ids: number[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // localStorage が使えない環境では無視
  }
}

export function useFavorites() {
  // SSRとクライアントの差分を避けるため、useEffect で初期読み込み
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  useEffect(() => {
    setFavoriteIds(loadIds());
  }, []);

  const toggleFavorite = useCallback((id: number) => {
    setFavoriteIds((prev) => {
      let next: number[];
      if (prev.includes(id)) {
        // 削除
        next = prev.filter((fid) => fid !== id);
      } else {
        // 先頭に追加（新しいものが上に来る）
        next = [id, ...prev];
      }
      saveIds(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: number) => favoriteIds.includes(id),
    [favoriteIds]
  );

  return {
    favoriteIds,
    toggleFavorite,
    isFavorite,
    count: favoriteIds.length,
  };
}
