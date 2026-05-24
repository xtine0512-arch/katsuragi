"use client";

import { useState, useEffect } from "react";
import { fetchHaiku, fetchMeta } from "@/lib/data";
import { useHaikuSearch } from "@/hooks/useHaikuSearch";
import { SearchBar } from "./SearchBar";
import { SeasonFilter } from "./SeasonFilter";
import { FilterPanel } from "./FilterPanel";
import { ResultsCards } from "./ResultsCards";
import { HaikuDetailModal } from "./HaikuDetailModal";
import type { HaikuRecord, HaikuMeta } from "@/types/haiku";

export function HaikuSearch() {
  const [allRecords, setAllRecords] = useState<HaikuRecord[]>([]);
  const [meta, setMeta] = useState<HaikuMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<HaikuRecord | null>(null);

  useEffect(() => {
    Promise.all([fetchHaiku(), fetchMeta()])
      .then(([haiku, metaData]) => {
        setAllRecords(haiku);
        setMeta(metaData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message ?? "データの読み込みに失敗しました");
        setLoading(false);
      });
  }, []);

  const {
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
  } = useHaikuSearch(allRecords);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-[#B5A49A]">
        <div className="w-8 h-8 border-2 border-[#E8D8CC] border-t-[#B83250] rounded-full animate-spin"/>
        <p className="text-sm font-medium">読み込み中...</p>
      </div>
    );
  }

  if (error || !meta) {
    return (
      <div className="text-center py-16">
        <p className="text-[#B83250] font-medium">{error ?? "データ読み込みエラー"}</p>
        <p className="text-sm mt-1 text-[#B5A49A]">public/data/haiku.json を確認してください</p>
      </div>
    );
  }

  // アクティブなフィルター数（季節除く）
  const extraFilterCount = [filters.kigo, filters.region, filters.authorText].filter(Boolean).length;

  return (
    <>
      {/* 検索エリア */}
      <div className="space-y-3 mb-5">
        {/* 検索バー + フィルターボタン */}
        <div className="flex gap-2">
          <div className="flex-1">
            <SearchBar value={filters.searchText} onChange={setSearchText}/>
          </div>
          <button
            onClick={() => setFilterOpen(true)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-3 rounded-xl border text-sm font-medium transition-all shadow-[0_1px_4px_rgba(0,0,0,0.05)] ${
              extraFilterCount > 0
                ? "bg-[#B83250] text-white border-[#B83250] shadow-[0_2px_8px_rgba(184,50,80,0.3)]"
                : "bg-white border-[#E8D8CC] text-[#7A6558] hover:bg-[#FAF6F1]"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0014 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 018 21v-7.586a1 1 0 00-.293-.707L1.293 6.707A1 1 0 011 6V4z"/>
            </svg>
            {extraFilterCount > 0 ? (
              <span className="flex items-center justify-center w-4 h-4 bg-white text-[#B83250] rounded-full text-[10px] font-bold">
                {extraFilterCount}
              </span>
            ) : (
              <span>絞込</span>
            )}
          </button>
        </div>

        {/* 季節フィルター */}
        <SeasonFilter
          seasons={meta.seasons}
          selected={filters.seasons}
          onToggle={toggleSeason}
        />

        {/* アクティブフィルター表示 */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2">
            {filters.kigo && (
              <ActiveTag label={`季語: ${filters.kigo}`} onRemove={() => setKigo("")}/>
            )}
            {filters.region && (
              <ActiveTag label={`地区: ${filters.region}`} onRemove={() => setRegion("")}/>
            )}
            {filters.authorText && (
              <ActiveTag label={`作者: ${filters.authorText}`} onRemove={() => setAuthorText("")}/>
            )}
            <button
              onClick={resetFilters}
              className="text-xs text-[#B5A49A] hover:text-[#B83250] transition-colors underline"
            >
              すべてリセット
            </button>
          </div>
        )}
      </div>

      {/* 結果 */}
      <ResultsCards
        records={results}
        searchText={filters.searchText}
        totalCount={allRecords.length}
        onSelectRecord={setSelectedRecord}
      />

      {/* フィルターオーバーレイ */}
      {filterOpen && (
        <FilterPanel
          meta={meta}
          filters={filters}
          availableKigo={availableKigo}
          hasActiveFilters={extraFilterCount > 0}
          onSetKigo={setKigo}
          onSetRegion={setRegion}
          onSetAuthorText={setAuthorText}
          onReset={() => { setKigo(""); setRegion(""); setAuthorText(""); }}
          onClose={() => setFilterOpen(false)}
        />
      )}

      {/* 詳細モーダル */}
      {selectedRecord && (
        <HaikuDetailModal
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}
    </>
  );
}

function ActiveTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FDF0F3] border border-[#F0C8D0] rounded-full text-xs text-[#B83250] font-medium">
      {label}
      <button onClick={onRemove} className="text-[#D4849A] hover:text-[#B83250] transition-colors">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </span>
  );
}
