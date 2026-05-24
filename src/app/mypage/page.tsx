"use client";

export const runtime = "edge";

import Link from "next/link";
import { SakuraDecoration } from "@/components/SakuraDecoration";
import { BottomNav } from "@/components/BottomNav";

// ──────────────────────────────────────────────
// メニューアイテム定義
// ──────────────────────────────────────────────
type MenuItem = {
  label: string;
  sublabel?: string;
  href?: string;
  icon: React.ReactNode;
  badge?: string;
  danger?: boolean;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

const MENU_SECTIONS: MenuSection[] = [
  {
    title: "俳句コレクション",
    items: [
      {
        label: "お気に入り",
        sublabel: "保存した俳句",
        href: "/favorites",
        badge: "0",
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        ),
      },
      {
        label: "閲覧履歴",
        sublabel: "最近見た俳句",
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        ),
      },
      {
        label: "読書メモ",
        sublabel: "俳句へのメモ・感想",
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        ),
      },
    ],
  },
  {
    title: "設定",
    items: [
      {
        label: "表示設定",
        sublabel: "フォント・文字サイズ",
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        ),
      },
      {
        label: "通知設定",
        sublabel: "プッシュ通知の管理",
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
        ),
      },
    ],
  },
  {
    title: "サポート",
    items: [
      {
        label: "かつらぎについて",
        sublabel: "バージョン 1.0.0",
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        ),
      },
      {
        label: "ヘルプ・お問い合わせ",
        sublabel: "使い方・ご意見・ご要望",
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        ),
      },
      {
        label: "データ出典・ライセンス",
        sublabel: "国文学研究資料館・その他",
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        ),
      },
    ],
  },
];

// ──────────────────────────────────────────────
// 統計カード
// ──────────────────────────────────────────────
function StatCard({
  value,
  label,
  icon,
  color,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="flex-1 bg-white rounded-2xl px-3 py-3.5 flex flex-col items-center gap-1.5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#F0E4DA]">
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <span className="text-lg font-bold text-[#2C1810] leading-none">{value}</span>
      <span className="text-[10px] text-[#B5A49A] text-center leading-tight">{label}</span>
    </div>
  );
}

// ──────────────────────────────────────────────
// メニュー行
// ──────────────────────────────────────────────
function MenuRow({ item }: { item: MenuItem }) {
  const inner = (
    <div
      className={`flex items-center gap-3 px-4 py-3.5 ${
        item.danger ? "text-[#B83250]" : "text-[#2C1810]"
      }`}
    >
      {/* アイコン */}
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${
          item.danger
            ? "bg-[#FDF0F3] text-[#B83250]"
            : "bg-[#FAF6F1] text-[#9A8880]"
        }`}
      >
        {item.icon}
      </div>

      {/* テキスト */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${item.danger ? "text-[#B83250]" : "text-[#2C1810]"}`}>
          {item.label}
        </p>
        {item.sublabel && (
          <p className="text-[11px] text-[#B5A49A] mt-0.5">{item.sublabel}</p>
        )}
      </div>

      {/* バッジ or 矢印 */}
      {item.badge !== undefined ? (
        <span className="text-xs font-medium text-[#B5A49A] bg-[#F0E4DA] rounded-full px-2.5 py-0.5 min-w-[1.75rem] text-center">
          {item.badge}
        </span>
      ) : (
        <svg
          className="w-4 h-4 text-[#C5B5AD] flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
        </svg>
      )}
    </div>
  );

  if (item.href) {
    return <Link href={item.href} className="block hover:bg-[#FBF7F3] transition-colors">{inner}</Link>;
  }
  return (
    <button className="w-full text-left hover:bg-[#FBF7F3] active:bg-[#F5EDE6] transition-colors">
      {inner}
    </button>
  );
}

// ──────────────────────────────────────────────
// メインページ
// ──────────────────────────────────────────────
export default function MyPage() {
  return (
    <div className="min-h-screen bg-[#F4EDE4] flex flex-col">

      {/* ヘッダー */}
      <header className="bg-white sticky top-0 z-40 shadow-[0_1px_8px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="relative">
          <div className="max-w-xl mx-auto px-5 py-3.5 flex items-center gap-2.5">
            <div className="w-[3px] h-9 bg-gradient-to-b from-[#B83250] to-[#D45880] rounded-full flex-shrink-0" />
            <div className="flex flex-col gap-[3px]">
              <h1 className="text-[19px] font-bold text-[#2C1810] tracking-wider font-serif leading-none">
                マイページ
              </h1>
              <span className="text-[11px] text-[#B5A49A] font-serif tracking-[0.2em]">かつらぎ選集</span>
            </div>
          </div>
          <div className="absolute right-0 top-0 pointer-events-none">
            <SakuraDecoration className="w-[110px] h-[90px]" />
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 max-w-xl mx-auto w-full px-4 py-5 pb-28 space-y-5">

        {/* プロフィールカード */}
        <section className="bg-white rounded-3xl border border-[#F0E4DA] shadow-[0_1px_8px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-center gap-4">
              {/* アバター */}
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D45880] to-[#B83250] flex items-center justify-center shadow-[0_2px_8px_rgba(184,50,80,0.25)]">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                {/* 会員バッジ */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#C47A20] rounded-full flex items-center justify-center border-2 border-white">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
              </div>

              {/* ユーザー情報 */}
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold text-[#2C1810] tracking-wide truncate">
                  ゲストユーザー
                </h2>
                <p className="text-xs text-[#B5A49A] mt-0.5">会員登録するとすべての機能が使えます</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-[10px] font-medium px-2 py-0.5 bg-[#FCF6EC] border border-[#EDD8AC] rounded-full text-[#C47A20]">
                    無料会員
                  </span>
                </div>
              </div>

              {/* 編集ボタン */}
              <button className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#FAF6F1] flex items-center justify-center text-[#B5A49A] hover:bg-[#F0E4DA] hover:text-[#7A6558] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* 会員登録バナー */}
          <div className="mx-4 mb-4 rounded-2xl bg-gradient-to-r from-[#B83250] to-[#D45880] px-4 py-3 flex items-center gap-3">
            <div className="flex-1">
              <p className="text-[11px] font-semibold text-white/80 tracking-wide">会員登録（無料）</p>
              <p className="text-sm font-bold text-white leading-tight mt-0.5">
                お気に入り・メモを保存しよう
              </p>
            </div>
            <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </section>

        {/* 利用統計 */}
        <section>
          <p className="text-xs font-medium text-[#B5A49A] mb-2.5 tracking-wide px-1">
            利用状況
          </p>
          <div className="flex gap-3">
            <StatCard
              value="0"
              label={"お気に入り\n俳句"}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              }
              color="bg-[#FDF0F3] text-[#B83250]"
            />
            <StatCard
              value="0"
              label={"最近の\n閲覧"}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              }
              color="bg-[#EEF4F8] text-[#4A7090]"
            />
            <StatCard
              value="0"
              label={"読書\nメモ"}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              }
              color="bg-[#FCF6EC] text-[#C47A20]"
            />
          </div>
        </section>

        {/* 今日の一句 */}
        <section className="bg-white rounded-3xl border border-[#F0E4DA] shadow-[0_1px_8px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-[#B5A49A] tracking-wide">今日の一句</p>
              <span className="text-[10px] text-[#C5B5AD] px-2 py-0.5 bg-[#FAF6F1] rounded-full border border-[#F0E4DA]">
                春
              </span>
            </div>
            {/* 縦書き俳句 */}
            <div className="flex justify-center py-3">
              <div
                className="text-xl font-bold text-[#2C1810] font-serif leading-[2.2]"
                style={{ writingMode: "vertical-rl" }}
              >
                古池や蛙飛び込む水の音
              </div>
            </div>
            <div className="text-center mt-2">
              <p className="text-xs text-[#B5A49A] font-serif">松尾芭蕉</p>
            </div>
          </div>
          <div className="border-t border-[#F5EDE6] px-5 py-3 flex items-center justify-between">
            <p className="text-[11px] text-[#C5B5AD]">毎日更新</p>
            <Link
              href="/"
              className="text-[11px] font-medium text-[#B83250] flex items-center gap-1 hover:opacity-75 transition-opacity"
            >
              俳句を探す
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </section>

        {/* メニューセクション */}
        {MENU_SECTIONS.map((section) => (
          <section key={section.title}>
            <p className="text-xs font-medium text-[#B5A49A] mb-2.5 tracking-wide px-1">
              {section.title}
            </p>
            <div className="bg-white rounded-3xl border border-[#F0E4DA] shadow-[0_1px_8px_rgba(0,0,0,0.05)] overflow-hidden divide-y divide-[#F5EDE6]">
              {section.items.map((item) => (
                <MenuRow key={item.label} item={item} />
              ))}
            </div>
          </section>
        ))}

        {/* バージョン情報 */}
        <div className="text-center py-2">
          <p className="text-[10px] text-[#C5B5AD]">かつらぎ選集 第十巻 — ver. 1.0.0</p>
        </div>

      </main>

      {/* ボトムナビゲーション */}
      <BottomNav />
    </div>
  );
}
