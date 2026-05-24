"use client";

import { useState, useEffect } from "react";
import { HaikuCard } from "./HaikuCard";
import type { HaikuRecord } from "@/types/haiku";

const PAGE_SIZE = 30;

interface ResultsCardsProps {
  records: HaikuRecord[];
  searchText?: string;
  totalCount: number;
  onSelectRecord: (record: HaikuRecord) => void;
}

export function ResultsCards({
  records,
  searchText = "",
  totalCount,
  onSelectRecord,
}: ResultsCardsProps) {
  const [page, setPage] = useState(1);

  useEffect(() => { setPage(1); }, [records]);

  const pageCount = Math.ceil(records.length / PAGE_SIZE);
  const pageStart = (page - 1) * PAGE_SIZE;
  const pageRecords = records.slice(pageStart, pageStart + PAGE_SIZE);

  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#B5A49A]">
        <svg className="w-12 h-12 mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p className="text-sm font-medium">該当する俳句が見つかりません</p>
        <p className="text-xs mt-1">フィルターを変更してお試しください</p>
      </div>
    );
  }

  return (
    <div>
      {/* 件数ヘッダー */}
      <div className="flex items-center justify-between mb-4 px-1">
        <p className="text-xs text-[#B5A49A]">
          {records.length < totalCount ? (
            <>
              <span className="font-semibold text-[#7A6558]">{records.length.toLocaleString()}</span>
              <span className="ml-1">件</span>
              <span className="ml-1 text-[#D8C8BE]">/ 全{totalCount.toLocaleString()}件</span>
            </>
          ) : (
            <>全 <span className="font-semibold text-[#7A6558]">{totalCount.toLocaleString()}</span> 件</>
          )}
        </p>
        {pageCount > 1 && (
          <p className="text-xs text-[#B5A49A]">
            {pageStart + 1}〜{Math.min(pageStart + PAGE_SIZE, records.length)}件
          </p>
        )}
      </div>

      {/* カード一覧 */}
      <div className="space-y-3">
        {pageRecords.map((record) => (
          <HaikuCard
            key={record.id}
            record={record}
            searchText={searchText}
            onClick={onSelectRecord}
          />
        ))}
      </div>

      {/* ページネーション */}
      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6 pb-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-full text-sm border border-[#E8D8CC] text-[#7A6558] bg-white hover:bg-[#FAF6F1] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← 前へ
          </button>
          <span className="text-xs text-[#B5A49A] px-2">
            {page} / {pageCount}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={page === pageCount}
            className="px-4 py-2 rounded-full text-sm border border-[#E8D8CC] text-[#7A6558] bg-white hover:bg-[#FAF6F1] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            次へ →
          </button>
        </div>
      )}
    </div>
  );
}
