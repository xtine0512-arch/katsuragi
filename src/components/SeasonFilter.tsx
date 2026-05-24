"use client";

interface SeasonFilterProps {
  seasons: string[];
  selected: Set<string>;
  onToggle: (season: string) => void;
}

const SEASON_STYLES: Record<string, { active: string; inactive: string }> = {
  新年: {
    active:   "bg-[#B83250] text-white border-[#B83250]",
    inactive: "bg-white border-[#E8C8D0] text-[#B83250] hover:bg-[#FDF0F3]",
  },
  春: {
    active:   "bg-[#D45880] text-white border-[#D45880]",
    inactive: "bg-white border-[#EFCCD8] text-[#D45880] hover:bg-[#FDF0F5]",
  },
  夏: {
    active:   "bg-[#3270B8] text-white border-[#3270B8]",
    inactive: "bg-white border-[#BDD4EF] text-[#3270B8] hover:bg-[#EEF4FC]",
  },
  秋: {
    active:   "bg-[#C47A20] text-white border-[#C47A20]",
    inactive: "bg-white border-[#EDD8AC] text-[#C47A20] hover:bg-[#FCF6EC]",
  },
  冬: {
    active:   "bg-[#4A7090] text-white border-[#4A7090]",
    inactive: "bg-white border-[#C4D8E8] text-[#4A7090] hover:bg-[#EEF4F8]",
  },
  晩冬: {
    active:   "bg-[#3D5A78] text-white border-[#3D5A78]",
    inactive: "bg-white border-[#BCCFDF] text-[#3D5A78] hover:bg-[#EEF2F6]",
  },
  "春or冬": {
    active:   "bg-[#7640B8] text-white border-[#7640B8]",
    inactive: "bg-white border-[#D8C4EF] text-[#7640B8] hover:bg-[#F5F0FC]",
  },
};

const DEFAULT_STYLE = {
  active:   "bg-[#7A6558] text-white border-[#7A6558]",
  inactive: "bg-white border-[#E8D8CC] text-[#7A6558] hover:bg-[#FAF6F1]",
};

export function SeasonFilter({ seasons, selected, onToggle }: SeasonFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {seasons.map((season) => {
        const isActive = selected.has(season);
        const style = SEASON_STYLES[season] ?? DEFAULT_STYLE;
        return (
          <button
            key={season}
            onClick={() => onToggle(season)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all ${
              isActive ? style.active : style.inactive
            }`}
          >
            {season}
          </button>
        );
      })}
    </div>
  );
}
