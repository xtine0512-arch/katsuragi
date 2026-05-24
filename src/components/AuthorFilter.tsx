"use client";

interface AuthorFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function AuthorFilter({ value, onChange }: AuthorFilterProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#7A6558] mb-2">作者</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="作者名（部分一致）..."
          className={`w-full px-3.5 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4849A] focus:border-transparent bg-white pr-8 transition-all ${value ? "border-[#D4849A] text-[#B83250]" : "border-[#E8D8CC] text-[#2C1810]"}`}
        />
        {value && (
          <button onClick={() => onChange("")} className="absolute inset-y-0 right-2.5 flex items-center text-[#B5A49A] hover:text-[#7A6558]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
