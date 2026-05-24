export const runtime = "edge";

import { HaikuSearch } from "@/components/HaikuSearch";
import { SakuraDecoration } from "@/components/SakuraDecoration";
import { BottomNav } from "@/components/BottomNav";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F4EDE4] flex flex-col">
      {/* ヘッダー */}
      <header className="bg-white sticky top-0 z-40 shadow-[0_1px_8px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="relative">
          <div className="max-w-xl mx-auto px-5 py-3.5 flex items-center gap-2.5">
            {/* 縦アクセントライン */}
            <div className="w-[3px] h-9 bg-gradient-to-b from-[#B83250] to-[#D45880] rounded-full flex-shrink-0" />
            <div className="flex flex-col gap-[3px]">
              <h1 className="text-[19px] font-bold text-[#2C1810] tracking-wider font-serif leading-none">
                かつらぎ選集
              </h1>
              <span className="text-[11px] text-[#B5A49A] font-serif tracking-[0.2em]">第十巻</span>
            </div>
          </div>
          {/* 桜装飾 — 右上に絶対配置 */}
          <div className="absolute right-0 top-0 pointer-events-none">
            <SakuraDecoration className="w-[110px] h-[90px]" />
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 max-w-xl mx-auto w-full px-4 py-5">
        <HaikuSearch />
      </main>

      {/* ボトムナビゲーション */}
      <BottomNav />
    </div>
  );
}
