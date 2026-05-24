"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import type { HaikuRecord, FilterState } from "@/types/haiku";

const INITIAL_FILTER: FilterState = {
  searchText: "",
  seasons: new Set<string>(),
  kigo: "",
  region: "",
  authorText: "",
};

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export function useHaikuSearch(allRecords: HaikuRecord[]) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER);
  const debouncedSearchText = useDebounce(filters.searchText, 150);
  const debouncedAuthorText = useDebounce(filters.authorText, 150);

  // Serialize Set for useMemo dependency
  const seasonsKey = Array.from(filters.seasons).sort().join(",");

  const results = useMemo(() => {
    let data = allRecords;

    // 俳句テキスト全文検索
    if (debouncedSearchText) {
      data = data.filter((r) => r.haiku.includes(debouncedSearchText));
    }

    // 季節フィルター（空Set = 全表示）
    if (filters.seasons.size > 0) {
      data = data.filter((r) => filters.seasons.has(r.season));
    }

    // 季語フィルター（完全一致）
    if (filters.kigo) {
      data = data.filter((r) => r.kigo === filters.kigo);
    }

    // 地区フィルター（完全一致）
    if (filters.region) {
      data = data.filter((r) => r.region === filters.region);
    }

    // 作者フィルター（部分一致）
    if (debouncedAuthorText) {
      data = data.filter((r) => r.author.includes(debouncedAuthorText));
    }

    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRecords, debouncedSearchText, seasonsKey, filters.kigo, filters.region, debouncedAuthorText]);

  // 現在の季節フィルター適用後に存在する季語のみを絞り込んで返す
  const availableKigo = useMemo(() => {
    if (filters.seasons.size === 0) return null; // null = 絞り込みなし
    const kigoSet = new Set<string>();
    allRecords.forEach((r) => {
      if (filters.seasons.has(r.season)) kigoSet.add(r.kigo);
    });
    return kigoSet;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRecords, seasonsKey]);

  const setSearchText = useCallback(
    (text: string) => setFilters((f) => ({ ...f, searchText: text })),
    []
  );

  const toggleSeason = useCallback((season: string) => {
    setFilters((f) => {
      const next = new Set(f.seasons);
      if (next.has(season)) next.delete(season);
      else next.add(season);
      // 季節が変わったら季語フィルターをリセット
      return { ...f, seasons: next, kigo: "" };
    });
  }, []);

  const setKigo = useCallback(
    (kigo: string) => setFilters((f) => ({ ...f, kigo })),
    []
  );

  const setRegion = useCallback(
    (region: string) => setFilters((f) => ({ ...f, region })),
    []
  );

  const setAuthorText = useCallback(
    (text: string) => setFilters((f) => ({ ...f, authorText: text })),
    []
  );

  const resetFilters = useCallback(() => setFilters(INITIAL_FILTER), []);

  const hasActiveFilters =
    filters.searchText !== "" ||
    filters.seasons.size > 0 ||
    filters.kigo !== "" ||
    filters.region !== "" ||
    filters.authorText !== "";

  return {
    filters,
    results,
    availableKigo,
    hasActiveFilters,
    setSearchText,
    toggleSeason,
    setKigo,
    setRegion,
    setAuthorText,
    resetFilters,
  };
}
