"use client";

import type { HaikuRecord } from "@/types/haiku";

const SEASON_COLORS: Record<string, string> = {
  新年: "bg-[#F5DEDE] text-[#B83250]",
  春:   "bg-[#F9E4EE] text-[#B83250]",
  夏:   "bg-[#DFF0F9] text-[#3270B8]",
  秋:   "bg-[#FBF0DA] text-[#956A20]",
  冬:   "bg-[#E8EFF5] text-[#3D5A78]",
  晩冬: "bg-[#E2E8F0] text-[#3D5A78]",
};

function highlight(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.indexOf(query);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-yellow-100 text-yellow-900 rounded-sm not-italic">
        {text.slice(idx, idx + query.length)}
      </mark>
      {highlight(text.slice(idx + query.length), query)}
    </>
  );
}

/** 五七五の3パートに分割 */
function splitParts(record: HaikuRecord): [string, string, string] {
  const { haiku, split1, split2 } = record;
  if (split1 && split2 && split1 < split2 && split2 < haiku.length) {
    return [haiku.slice(0, split1), haiku.slice(split1, split2), haiku.slice(split2)];
  }
  return [haiku, "", ""];
}

interface HaikuCardProps {
  record: HaikuRecord;
  searchText?: string;
  onClick: (record: HaikuRecord) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

export function HaikuCard({
  record,
  searchText = "",
  onClick,
  isFavorite = false,
  onToggleFavorite,
}: HaikuCardProps) {
  const seasonColor = SEASON_COLORS[record.season] ?? "bg-[#E8EFF5] text-[#3D5A78]";
  const [p1, p2, p3] = splitParts(record);

  return (
    <div
      className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(44,24,16,0.07)] border border-[#EDE0D8] px-5 py-4 active:scale-[0.99] transition-all cursor-pointer hover:shadow-[0_4px_20px_rgba(44,24,16,0.1)]"
      onClick={() => onClick(record)}
    >
      {/* 五七五 縦書き */}
      <div className="flex justify-center items-center py-5 mb-4 min-h-[110px]">
        <p className="haiku-vertical text-[17px] text-[#2C1810]">
          {highlight(p1, searchText)}
          {p2 && <><br />{highlight(p2, searchText)}</>}
          {p3 && <><br />{highlight(p3, searchText)}</>}
        </p>
      </div>

      {/* メタ情報 */}
      <div className="border-t border-[#F0E6E0] pt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <span className="text-sm font-medium text-[#5C4035] truncate">{record.author}</span>
          <span className="text-[#D8C8BE] flex-shrink-0">·</span>
          <span className="text-xs text-[#B5A49A] flex-shrink-0">{record.region}</span>
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${seasonColor}`}>
            {record.season}
          </span>
        </div>

        {/* アクションボタン群 */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* お気に入りボタン */}
          {onToggleFavorite && (
            <button
              aria-label={isFavorite ? "お気に入りを解除" : "お気に入りに追加"}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(record.id);
              }}
              className={`p-1 rounded-full transition-all active:scale-90 ${
                isFavorite
                  ? "text-[#B83250]"
                  : "text-[#D8C8BE] hover:text-[#B83250]"
              }`}
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
          )}

          {/* 詳細ボタン */}
          <button
            className="text-xs text-[#B83250] font-medium whitespace-nowrap hover:text-[#8A2040] transition-colors"
            onClick={(e) => { e.stopPropagation(); onClick(record); }}
          >
            詳細を見る
          </button>
        </div>
      </div>
    </div>
  );
}
