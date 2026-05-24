"use client";

import { useEffect } from "react";
import { KigoFilter } from "./KigoFilter";
import { RegionFilter } from "./RegionFilter";
import { AuthorFilter } from "./AuthorFilter";
import type { HaikuMeta, FilterState } from "@/types/haiku";

interface FilterPanelProps {
  meta: HaikuMeta;
  filters: FilterState;
  availableKigo: Set<string> | null;
  hasActiveFilters: boolean;
  onSetKigo: (kigo: string) => void;
  onSetRegion: (region: string) => void;
  onSetAuthorText: (text: string) => void;
  onReset: () => void;
  onClose: () => void;
}

export function FilterPanel({
  meta,
  filters,
  availableKigo,
  hasActiveFilters,
  onSetKigo,
  onSetRegion,
  onSetAuthorText,
  onReset,
  onClose,
}: FilterPanelProps) {
  // ESC で閉じる
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  // スクロール禁止
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose}/>

      {/* Sheet */}
      <div className="relative w-full sm:max-w-md bg-[#FAF6F1] sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col max-h-[85dvh]">
        {/* ハンドル（モバイル） */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-[#D8C8BE] rounded-full"/>
        </div>

        {/* ヘッダー */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0E4DA]">
          <h2 className="text-base font-bold text-[#2C1810]">絞り込み</h2>
          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={onReset}
                className="text-xs text-[#B83250] font-medium hover:text-[#8A2040] transition-colors"
              >
                リセット
              </button>
            )}
            <button onClick={onClose} className="text-[#B5A49A] hover:text-[#7A6558] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        {/* フォーム */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
          <KigoFilter
            kigoList={meta.kigo}
            selected={filters.kigo}
            onChange={onSetKigo}
            availableKigo={availableKigo}
          />
          <RegionFilter
            regions={meta.regions}
            selected={filters.region}
            onChange={onSetRegion}
          />
          <AuthorFilter value={filters.authorText} onChange={onSetAuthorText} />
        </div>

        {/* 適用ボタン */}
        <div className="px-5 py-4 border-t border-[#F0E4DA] flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-[#B83250] hover:bg-[#9A2842] text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
          >
            フィルタを適用する
          </button>
        </div>
      </div>
    </div>
  );
}
