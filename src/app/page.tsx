import { HaikuSearch } from "@/components/HaikuSearch";
import { SakuraDecoration } from "@/components/SakuraDecoration";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F4EDE4] flex flex-col">
      {/* ヘッダー */}
      <header className="bg-white sticky top-0 z-40 shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
        <div className="max-w-xl mx-auto px-5 py-3 flex items-center justify-between overflow-hidden">
          <div className="flex items-baseline gap-2">
            <h1 className="text-xl font-bold text-[#2C1810] tracking-wide font-serif">
              かつらぎ選集
            </h1>
            <span className="text-sm text-[#B5A49A] font-serif">第十巻</span>
          </div>
          {/* 桜装飾 */}
          <div className="flex-shrink-0 -mr-2 -mt-3 -mb-3">
            <SakuraDecoration className="w-[90px] h-[76px]" />
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 max-w-xl mx-auto w-full px-4 py-5 pb-24">
        <HaikuSearch />
      </main>

      {/* ボトムナビゲーション（モバイル用） */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#F0E4DA] shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
        <div className="max-w-xl mx-auto flex items-center">
          {[
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
              ),
              label: "ホーム",
              active: true,
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              ),
              label: "検索",
              active: false,
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              ),
              label: "お気に入り",
              active: false,
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              ),
              label: "マイページ",
              active: false,
            },
          ].map(({ icon, label, active }) => (
            <button
              key={label}
              className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-colors ${
                active ? "text-[#B83250]" : "text-[#C5B5AD] hover:text-[#7A6558]"
              }`}
            >
              {icon}
              <span className={`text-[10px] font-medium ${active ? "text-[#B83250]" : "text-[#C5B5AD]"}`}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
