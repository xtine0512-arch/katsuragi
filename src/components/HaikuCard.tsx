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
}

export function HaikuCard({ record, searchText = "", onClick }: HaikuCardProps) {
  const seasonColor = SEASON_COLORS[record.season] ?? "bg-[#E8EFF5] text-[#3D5A78]";
  const [p1, p2, p3] = splitParts(record);

  return (
    <div
      className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-[#F0E4DA] px-5 py-5 active:scale-[0.99] transition-transform cursor-pointer"
      onClick={() => onClick(record)}
    >
      {/* 五七五 縦書き */}
      <div className="flex justify-center py-3 mb-4">
        <p className="haiku-vertical text-[16px] text-[#2C1810]">
          {highlight(p1, searchText)}
          {p2 && <><br />{highlight(p2, searchText)}</>}
          {p3 && <><br />{highlight(p3, searchText)}</>}
        </p>
      </div>

      {/* メタ情報 */}
      <div className="border-t border-[#F7EEE8] pt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <span className="text-sm text-[#7A6558] truncate">{record.author}</span>
          <span className="text-[#D8C8BE] flex-shrink-0">·</span>
          <span className="text-sm text-[#B5A49A] flex-shrink-0">{record.region}</span>
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${seasonColor}`}>
            {record.season}
          </span>
        </div>
        <button
          className="text-xs text-[#B83250] font-medium whitespace-nowrap flex-shrink-0 hover:text-[#8A2040] transition-colors"
          onClick={(e) => { e.stopPropagation(); onClick(record); }}
        >
          詳細を見る
        </button>
      </div>
    </div>
  );
}
