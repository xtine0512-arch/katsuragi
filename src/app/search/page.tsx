"use client";

export const runtime = "edge";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { fetchHaiku, fetchMeta } from "@/lib/data";
import { useHaikuSearch } from "@/hooks/useHaikuSearch";
import { useFavorites } from "@/hooks/useFavorites";
import { SearchBar } from "@/components/SearchBar";
import { SeasonFilter } from "@/components/SeasonFilter";
import { KigoFilter } from "@/components/KigoFilter";
import { RegionFilter } from "@/components/RegionFilter";
import { AuthorFilter } from "@/components/AuthorFilter";
import { ResultsCards } from "@/components/ResultsCards";
import { HaikuDetailModal } from "@/components/HaikuDetailModal";
import { SakuraDecoration } from "@/components/SakuraDecoration";
import { BottomNav } from "@/components/BottomNav";
import type { HaikuRecord, HaikuMeta } from "@/types/haiku";

// カテゴリー定義
type CategoryKey = "season" | "kigo" | "author" | "region";

const CATEGORIES: {
  key: CategoryKey;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  color: string;
  activeBg: string;
  activeText: string;
  borderColor: string;
}[] = [
  {
    key: "season",
    label: "季節で探す",
    sublabel: "新年・春・夏・秋・冬・晩冬",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.728 12.728l.707.707M3 12H2m20 0h-1M4.22 19.78l.707-.707M18.364 5.636l.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z"/>
      </svg>
    ),
    color: "text-[#D45880]",
    activeBg: "bg-[#FDF0F3]",
    activeText: "text-[#B83250]",
    borderColor: "border-[#F0C8D0]",
  },
  {
    key: "kigo",
    label: "季語で探す",
    sublabel: "790以上の季語から",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
      </svg>
    ),
    color: "text-[#C47A20]",
    activeBg: "bg-[#FCF6EC]",
    activeText: "text-[#C47A20]",
    borderColor: "border-[#EDD8AC]",
  },
  {
    key: "author",
    label: "作者で探す",
    sublabel: "700以上の俳人から",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
      </svg>
    ),
    color: "text-[#4A7090]",
    activeBg: "bg-[#EEF4F8]",
    activeText: "text-[#4A7090]",
    borderColor: "border-[#C4D8E8]",
  },
  {
    key: "region",
    label: "地区で探す",
    sublabel: "全国140以上の地域から",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
    color: "text-[#3270B8]",
    activeBg: "bg-[#EEF4FC]",
    activeText: "text-[#3270B8]",
    borderColor: "border-[#BDD4EF]",
  },
];

// アクティブタグ
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

export default function SearchPage() {
  const [allRecords, setAllRecords] = useState<HaikuRecord[]>([]);
  const [meta, setMeta] = useState<HaikuMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<HaikuRecord | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<CategoryKey | null>(null);
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

  const toggleCategory = useCallback((key: CategoryKey) => {
    setExpandedCategory((prev) => (prev === key ? null : key));
  }, []);

  const showResults = hasActiveFilters || filters.searchText.length > 0;

  return (
    <div className="min-h-screen bg-[#F4EDE4] flex flex-col">
      {/* ヘッダー */}
      <header className="bg-white sticky top-0 z-40 shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
        <div className="max-w-xl mx-auto px-5 py-3 flex items-center justify-between overflow-hidden">
          <Link href="/" className="flex items-baseline gap-2 active:opacity-70 transition-opacity">
            <h1 className="text-xl font-bold text-[#2C1810] tracking-wide font-serif">
              かつらぎ選集
            </h1>
            <span className="text-sm text-[#B5A49A] font-serif">第十巻</span>
          </Link>
          <div className="flex-shrink-0 -mr-2 -mt-3 -mb-3">
            <SakuraDecoration className="w-[90px] h-[76px]" />
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 max-w-xl mx-auto w-full px-4 py-5 pb-24 space-y-5">

        {/* 検索バーセクション */}
        <section>
          <p className="text-xs font-medium text-[#B5A49A] mb-2 tracking-wide">俳句を探す</p>
          <SearchBar value={filters.searchText} onChange={setSearchText} />
        </section>

        {/* ローディング */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-[#B5A49A]">
            <div className="w-7 h-7 border-2 border-[#E8D8CC] border-t-[#B83250] rounded-full animate-spin"/>
            <p className="text-sm">読み込み中...</p>
          </div>
        )}

        {/* エラー */}
        {error && (
          <div className="text-center py-10">
            <p className="text-[#B83250] font-medium">{error}</p>
          </div>
        )}

        {/* カテゴリーメニュー */}
        {!loading && !error && meta && (
          <section>
            <p className="text-xs font-medium text-[#B5A49A] mb-3 tracking-wide">カテゴリーで絞り込む</p>

            <div className="space-y-2">
              {CATEGORIES.map((cat) => {
                const isOpen = expandedCategory === cat.key;

                // カテゴリー別アクティブ状態
                const isActive =
                  cat.key === "season" ? filters.seasons.size > 0 :
                  cat.key === "kigo"   ? !!filters.kigo :
                  cat.key === "author" ? !!filters.authorText :
                  cat.key === "region" ? !!filters.region : false;

                // カテゴリー別バッジ
                const badge =
                  cat.key === "season" ? (filters.seasons.size > 0 ? `${filters.seasons.size}件選択中` : null) :
                  cat.key === "kigo"   ? (filters.kigo || null) :
                  cat.key === "author" ? (filters.authorText || null) :
                  cat.key === "region" ? (filters.region || null) : null;

                return (
                  <div
                    key={cat.key}
                    className={`bg-white rounded-2xl border shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all ${
                      isActive ? `${cat.borderColor}` : "border-[#F0E4DA]"
                    }`}
                  >
                    {/* カテゴリーヘッダー */}
                    <button
                      onClick={() => toggleCategory(cat.key)}
                      className="w-full flex items-center px-4 py-3.5 gap-3 text-left"
                    >
                      {/* アイコン */}
                      <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${
                        isActive ? `${cat.activeBg} ${cat.color}` : "bg-[#FAF6F1] text-[#B5A49A]"
                      }`}>
                        {cat.icon}
                      </div>

                      {/* テキスト */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold ${isActive ? cat.activeText : "text-[#2C1810]"}`}>
                            {cat.label}
                          </span>
                          {badge && (
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${cat.activeBg} ${cat.activeText} ${cat.borderColor} truncate max-w-[120px]`}>
                              {badge}
                            </span>
                          )}
                        </div>
                        {!badge && (
                          <p className="text-[11px] text-[#B5A49A] mt-0.5">{cat.sublabel}</p>
                        )}
                      </div>

                      {/* 展開アイコン */}
                      <svg
                        className={`w-4 h-4 text-[#C5B5AD] transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                      </svg>
                    </button>

                    {/* カテゴリー展開エリア */}
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 border-t border-[#F5EDE6]">
                        {cat.key === "season" && (
                          <div className="pt-3">
                            <SeasonFilter
                              seasons={meta.seasons}
                              selected={filters.seasons}
                              onToggle={toggleSeason}
                            />
                          </div>
                        )}
                        {cat.key === "kigo" && (
                          <div className="pt-3">
                            <KigoFilter
                              kigoList={meta.kigo}
                              selected={filters.kigo}
                              onChange={setKigo}
                              availableKigo={availableKigo}
                            />
                          </div>
                        )}
                        {cat.key === "author" && (
                          <div className="pt-3">
                            <AuthorFilter value={filters.authorText} onChange={setAuthorText} />
                          </div>
                        )}
                        {cat.key === "region" && (
                          <div className="pt-3">
                            <RegionFilter
                              regions={meta.regions}
                              selected={filters.region}
                              onChange={setRegion}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* アクティブフィルタータグ */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2">
            {filters.kigo && (
              <ActiveTag label={`季語: ${filters.kigo}`} onRemove={() => setKigo("")} />
            )}
            {filters.region && (
              <ActiveTag label={`地区: ${filters.region}`} onRemove={() => setRegion("")} />
            )}
            {filters.authorText && (
              <ActiveTag label={`作者: ${filters.authorText}`} onRemove={() => setAuthorText("")} />
            )}
            {filters.seasons.size > 0 && (
              <ActiveTag
                label={`季節: ${Array.from(filters.seasons).join("・")}`}
                onRemove={() => Array.from(filters.seasons).forEach(toggleSeason)}
              />
            )}
            <button
              onClick={resetFilters}
              className="text-xs text-[#B5A49A] hover:text-[#B83250] transition-colors underline"
            >
              すべてリセット
            </button>
          </div>
        )}

        {/* 検索結果 */}
        {!loading && !error && showResults && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px flex-1 bg-[#E8D8CC]"/>
              <span className="text-xs text-[#B5A49A] font-medium">検索結果</span>
              <div className="h-px flex-1 bg-[#E8D8CC]"/>
            </div>
            <ResultsCards
              records={results}
              searchText={filters.searchText}
              totalCount={allRecords.length}
              onSelectRecord={setSelectedRecord}
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
          </section>
        )}

        {/* 初期状態（検索前） */}
        {!loading && !error && !showResults && meta && (
          <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
            <div className="w-14 h-14 rounded-full bg-[#FAF6F1] flex items-center justify-center">
              <svg className="w-7 h-7 text-[#D4B0B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-[#7A6558]">俳句を検索してみましょう</p>
              <p className="text-xs text-[#B5A49A] mt-1">
                キーワード入力またはカテゴリーを選択してください
              </p>
            </div>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-[#C5B5AD]">
              <span className="px-2.5 py-1 bg-white rounded-full border border-[#F0E4DA]">
                全{allRecords.length.toLocaleString()}句
              </span>
              <span>収録</span>
            </div>
          </div>
        )}
      </main>

      {/* 詳細モーダル */}
      {selectedRecord && (
        <HaikuDetailModal
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}

      {/* ボトムナビゲーション */}
      <BottomNav />
    </div>
  );
}
