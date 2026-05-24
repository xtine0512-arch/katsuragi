"use client";

import { useState, useEffect } from "react";
import { fetchHaiku, fetchMeta } from "@/lib/data";
import { useHaikuSearch } from "@/hooks/useHaikuSearch";
import { useFavorites } from "@/hooks/useFavorites";
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
  const { favoriteIds, toggleFavorite } = useFavorites();

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

  // アクティブなフィルター数（季節除く）
  const extraFilterCount = [filters.kigo, filters.region, filters.authorText].filter(Boolean).length;
  const isSearching = hasActiveFilters || filters.searchText.length > 0;

  if (loading) {
    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-[#B5A49A]">
          <div className="w-8 h-8 border-2 border-[#E8D8CC] border-t-[#B83250] rounded-full animate-spin"/>
          <p className="text-sm font-medium">読み込み中...</p>
        </div>
        {/* ローディング中もボトムバーのプレースホルダーを表示 */}
        <div className="fixed bottom-[56px] left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-t border-[#F0E4DA] shadow-[0_-4px_20px_rgba(44,24,16,0.08)] px-4 pt-3 pb-4">
          <div className="max-w-xl mx-auto space-y-2.5">
            <div className="h-[46px] bg-[#F4EDE4] rounded-2xl animate-pulse" />
            <div className="flex gap-2">
              {["新年","春","夏","秋","冬","晩冬"].map(s => (
                <div key={s} className="h-8 w-12 bg-[#F4EDE4] rounded-full animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </>
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

  return (
    <>
      {/* メインコンテンツエリア */}
      <div className="pb-[195px] md:pb-[240px]">
        {isSearching ? (
          /* 検索・フィルター中: 結果一覧を表示 */
          <>
            {/* アクティブフィルター表示 */}
            {(filters.kigo || filters.region || filters.authorText) && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
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

            <ResultsCards
              records={results}
              searchText={filters.searchText}
              totalCount={allRecords.length}
              onSelectRecord={setSelectedRecord}
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
          </>
        ) : (
          /* 初期状態: ウェルカムビュー */
          <HeroView totalCount={allRecords.length} featuredRecord={allRecords[0] ?? null} />
        )}
      </div>

      {/* ─────── 固定ボトム検索バー（BottomNavの上） ─────── */}
      <div className="fixed bottom-[56px] left-0 right-0 z-30 overflow-hidden bg-white/95 backdrop-blur-sm border-t border-[#F0E4DA] shadow-[0_-4px_24px_rgba(44,24,16,0.09)]">
        <div className="max-w-xl md:max-w-2xl mx-auto px-3 md:px-4 pt-2 pb-2 md:pt-3 md:pb-3">
          {/* 検索バー + 絞込ボタン */}
          <div className="flex gap-2 mb-1.5 md:mb-2.5">
            <div className="flex-1">
              <SearchBar value={filters.searchText} onChange={setSearchText} />
            </div>
            <button
              onClick={() => setFilterOpen(true)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 rounded-2xl border text-sm md:text-base font-medium transition-all shadow-[0_2px_8px_rgba(0,0,0,0.06)] ${
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
        </div>
      </div>

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

/* ───────────────────────────────────────────────────
   ウェルカム／ヒーローセクション（初期表示）
─────────────────────────────────────────────────── */
function splitHaikuParts(record: HaikuRecord): [string, string, string] {
  const { haiku, split1, split2 } = record;
  if (split1 && split2 && split1 < split2 && split2 < haiku.length) {
    return [haiku.slice(0, split1), haiku.slice(split1, split2), haiku.slice(split2)];
  }
  return [haiku, "", ""];
}

function HeroView({ totalCount, featuredRecord }: {
  totalCount: number;
  featuredRecord: HaikuRecord | null;
}) {
  const parts = featuredRecord ? splitHaikuParts(featuredRecord) : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[52vh] px-4 select-none">
      {/* コレクション情報 */}
      <div className="text-center mb-8 md:mb-10">
        <p className="text-xs md:text-sm text-[#B5A49A] tracking-[0.2em] font-serif mb-1">収録俳句</p>
        <p className="text-3xl md:text-5xl font-bold text-[#2C1810] font-serif tracking-wider">
          {totalCount.toLocaleString()}
          <span className="text-base md:text-2xl font-medium ml-1">句</span>
        </p>
      </div>

      {/* おすすめ俳句（縦書き3行） */}
      {featuredRecord && parts && (
        <div className="flex flex-col items-center gap-3 md:gap-4 mb-8 md:mb-10">
          <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(44,24,16,0.08)] border border-[#EDE0D8] px-8 py-6 md:px-12 md:py-8 flex justify-center">
            <p className="haiku-vertical text-[18px] md:text-[24px] text-[#2C1810] tracking-widest leading-relaxed">
              {parts[0]}
              {parts[1] && <><br />{parts[1]}</>}
              {parts[2] && <><br />{parts[2]}</>}
            </p>
          </div>
          <p className="text-xs md:text-sm text-[#B5A49A] font-serif">
            {featuredRecord.author}
            {featuredRecord.region && <span className="ml-2">({featuredRecord.region})</span>}
          </p>
        </div>
      )}

      {/* 案内テキスト */}
      <p className="text-xs md:text-sm text-[#C5B5AD] text-center leading-relaxed">
        下の検索バーや季節ボタンから<br />お探しの俳句を見つけてください
      </p>
    </div>
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
