"use client";

interface SeasonFilterProps {
  seasons: string[];
  selected: Set<string>;
  onToggle: (season: string) => void;
}

/* 季節ごとの色 + 装飾文字 */
const SEASON_CONFIG: Record<string, {
  active: string;
  inactive: string;
  border: string;
  deco: string;        // 装飾用の小さな文字
}> = {
  新年: {
    active:   "bg-[#B83250] text-white",
    inactive: "bg-white text-[#B83250]",
    border:   "border-[#B83250]",
    deco:     "元旦",
  },
  春: {
    active:   "bg-[#D45880] text-white",
    inactive: "bg-white text-[#D45880]",
    border:   "border-[#D45880]",
    deco:     "桜",
  },
  夏: {
    active:   "bg-[#2B6CB8] text-white",
    inactive: "bg-white text-[#2B6CB8]",
    border:   "border-[#2B6CB8]",
    deco:     "青葉",
  },
  秋: {
    active:   "bg-[#B86C10] text-white",
    inactive: "bg-white text-[#B86C10]",
    border:   "border-[#B86C10]",
    deco:     "紅葉",
  },
  冬: {
    active:   "bg-[#3D6880] text-white",
    inactive: "bg-white text-[#3D6880]",
    border:   "border-[#3D6880]",
    deco:     "雪",
  },
  晩冬: {
    active:   "bg-[#2E4A64] text-white",
    inactive: "bg-white text-[#2E4A64]",
    border:   "border-[#2E4A64]",
    deco:     "冬末",
  },
  "春or冬": {
    active:   "bg-[#6B35A8] text-white",
    inactive: "bg-white text-[#6B35A8]",
    border:   "border-[#6B35A8]",
    deco:     "",
  },
};

const DEFAULT_CONFIG = {
  active:   "bg-[#5C4035] text-white",
  inactive: "bg-white text-[#5C4035]",
  border:   "border-[#5C4035]",
  deco:     "",
};

export function SeasonFilter({ seasons, selected, onToggle }: SeasonFilterProps) {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {seasons.map((season) => {
        const isActive = selected.has(season);
        const cfg = SEASON_CONFIG[season] ?? DEFAULT_CONFIG;

        return (
          <button
            key={season}
            onClick={() => onToggle(season)}
            className={`
              relative flex flex-col items-center justify-center
              py-3 rounded-xl border-2 transition-all
              active:scale-[0.97] select-none
              ${cfg.border}
              ${isActive ? cfg.active : cfg.inactive}
              ${isActive
                ? "shadow-[0_2px_10px_rgba(0,0,0,0.18)]"
                : "shadow-[0_1px_4px_rgba(0,0,0,0.07)] hover:opacity-80"}
            `}
          >
            {/* メインの季節名 */}
            <span className="text-[17px] font-bold tracking-wider leading-none font-serif">
              {season}
            </span>
            {/* 選択中チェックマーク */}
            {isActive && (
              <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-white/30 rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                </svg>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
