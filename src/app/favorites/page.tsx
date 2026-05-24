"use client";

export const runtime = "edge";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { fetchHaiku } from "@/lib/data";
import { useFavorites } from "@/hooks/useFavorites";
import { HaikuCard } from "@/components/HaikuCard";
import { HaikuDetailModal } from "@/components/HaikuDetailModal";
import { SakuraDecoration } from "@/components/SakuraDecoration";
import { BottomNav } from "@/components/BottomNav";
import type { HaikuRecord } from "@/types/haiku";

export default function FavoritesPage() {
  const [allRecords, setAllRecords] = useState<HaikuRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<HaikuRecord | null>(null);

  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites();

  /* 俳句データ読み込み */
  useEffect(() => {
    fetchHaiku()
      .then((records) => {
        setAllRecords(records);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message ?? "データの読み込みに失敗しました");
        setLoading(false);
      });
  }, []);

  /* お気に入り順（新しい順）で絞り込み */
  const favoriteRecords = useMemo(() => {
    if (allRecords.length === 0 || favoriteIds.length === 0) return [];
    const map = new Map(allRecords.map((r) => [r.id, r]));
    // favoriteIds はすでに「新しい順」に並んでいる
    return favoriteIds.flatMap((id) => {
      const r = map.get(id);
      return r ? [r] : [];
    });
  }, [allRecords, favoriteIds]);

  /* ---- レンダリング ---- */

  return (
    <div className="min-h-screen bg-[#F4EDE4] flex flex-col">

      {/* ヘッダー */}
      <header className="bg-white sticky top-0 z-40 shadow-[0_1px_8px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="relative">
          <div className="max-w-xl md:max-w-2xl mx-auto px-5 py-3.5 md:py-4 flex items-center gap-2.5">
            <Link href="/" className="flex items-center gap-2.5 active:opacity-70 transition-opacity">
              <div className="w-[3px] h-9 md:h-11 bg-gradient-to-b from-[#B83250] to-[#D45880] rounded-full flex-shrink-0" />
              <h1 className="text-[19px] md:text-[24px] font-bold text-[#2C1810] tracking-wider font-serif leading-none">
                かつらぎ選集
              </h1>
            </Link>
          </div>
          <div className="absolute right-0 top-0 pointer-events-none">
            <SakuraDecoration className="w-[110px] h-[90px]" />
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 max-w-xl mx-auto w-full px-4 py-5 pb-24">

        {/* ページタイトル */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-[#FDF0F3] flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-[#B83250]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-base font-bold text-[#2C1810] tracking-wide">お気に入り</h2>
            {!loading && (
              <p className="text-[11px] text-[#B5A49A] mt-0.5">
                {favoriteIds.length > 0
                  ? `${favoriteIds.length}句 保存済み`
                  : "まだ保存された俳句はありません"}
              </p>
            )}
          </div>
        </div>

        {/* ローディング */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-[#B5A49A]">
            <div className="w-7 h-7 border-2 border-[#E8D8CC] border-t-[#B83250] rounded-full animate-spin" />
            <p className="text-sm">読み込み中...</p>
          </div>
        )}

        {/* エラー */}
        {error && (
          <div className="text-center py-16">
            <p className="text-[#B83250] font-medium">{error}</p>
          </div>
        )}

        {/* お気に入りが空の状態 */}
        {!loading && !error && favoriteIds.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            {/* ハートアイコン（アウトライン） */}
            <div className="w-20 h-20 rounded-full bg-[#FDF0F3] flex items-center justify-center">
              <svg className="w-10 h-10 text-[#EDAABB]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#5C4035]">お気に入りはまだありません</p>
              <p className="text-xs text-[#B5A49A] mt-1.5 leading-relaxed">
                俳句カードの
                <svg className="inline w-3.5 h-3.5 mx-0.5 text-[#B83250] translate-y-[1px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                ボタンを押して追加しましょう
              </p>
            </div>

            <div className="flex gap-3 mt-2">
              <Link
                href="/"
                className="px-5 py-2.5 bg-[#B83250] text-white text-sm font-medium rounded-full shadow-[0_2px_8px_rgba(184,50,80,0.3)] hover:bg-[#A02845] transition-colors"
              >
                ホームへ
              </Link>
              <Link
                href="/search"
                className="px-5 py-2.5 bg-white text-[#7A6558] text-sm font-medium rounded-full border border-[#E8D8CC] hover:bg-[#FAF6F1] transition-colors"
              >
                俳句を検索
              </Link>
            </div>
          </div>
        )}

        {/* お気に入り一覧 */}
        {!loading && !error && favoriteRecords.length > 0 && (
          <section>
            {/* 区切り線 */}
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-[#E8D8CC]" />
              <span className="text-xs text-[#B5A49A] font-medium">新しい順</span>
              <div className="h-px flex-1 bg-[#E8D8CC]" />
            </div>

            {/* カード一覧 */}
            <div className="space-y-3.5">
              {favoriteRecords.map((record) => (
                <HaikuCard
                  key={record.id}
                  record={record}
                  onClick={setSelectedRecord}
                  isFavorite={isFavorite(record.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>

            {/* フッター（件数） */}
            <div className="mt-8 flex items-center justify-center">
              <span className="text-xs text-[#C5B5AD] px-3 py-1.5 bg-white rounded-full border border-[#F0E4DA]">
                全 {favoriteRecords.length} 句
              </span>
            </div>
          </section>
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
