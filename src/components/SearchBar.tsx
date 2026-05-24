"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <svg className="w-4 h-4 text-[#B5A49A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="俳句を検索..."
        className="w-full pl-11 pr-10 py-3.5 bg-white border border-[#E8D8CC] rounded-2xl text-sm text-[#2C1810] placeholder:text-[#C5B5AD] focus:outline-none focus:ring-2 focus:ring-[#D4849A] focus:border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-3 flex items-center text-[#B5A49A] hover:text-[#7A6558] transition-colors"
          aria-label="検索をクリア"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      )}
    </div>
  );
}
