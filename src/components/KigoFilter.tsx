"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface KigoFilterProps {
  kigoList: [string, number][];
  selected: string;
  onChange: (kigo: string) => void;
  availableKigo?: Set<string> | null;
}

export function KigoFilter({ kigoList, selected, onChange, availableKigo }: KigoFilterProps) {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredKigo = kigoList.filter(([text]) => {
    if (availableKigo && !availableKigo.has(text)) return false;
    if (inputValue && !text.includes(inputValue)) return false;
    return true;
  });

  useEffect(() => {
    if (!isOpen) setInputValue(selected ?? "");
  }, [selected, isOpen]);

  const handleSelect = useCallback((kigo: string) => {
    onChange(kigo); setInputValue(kigo); setIsOpen(false); setHighlightedIndex(-1);
  }, [onChange]);

  const handleClear = useCallback(() => {
    onChange(""); setInputValue(""); setIsOpen(false); inputRef.current?.focus();
  }, [onChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && e.key !== "Escape") setIsOpen(true);
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlightedIndex((i) => Math.min(i + 1, filteredKigo.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHighlightedIndex((i) => Math.max(i - 1, -1)); }
    else if (e.key === "Enter") { e.preventDefault(); if (highlightedIndex >= 0 && filteredKigo[highlightedIndex]) handleSelect(filteredKigo[highlightedIndex][0]); }
    else if (e.key === "Escape") { setIsOpen(false); setInputValue(selected || ""); }
  };

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      (listRef.current.children[highlightedIndex] as HTMLElement)?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false); setInputValue(selected || "");
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [selected]);

  return (
    <div ref={containerRef}>
      <label className="block text-xs font-semibold text-[#7A6558] mb-2">
        季語
        <span className="ml-1 font-normal text-[#B5A49A]">
          ({(availableKigo ? availableKigo.size : kigoList.length).toLocaleString()}語)
        </span>
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => { setInputValue(e.target.value); setIsOpen(true); setHighlightedIndex(-1); if (!e.target.value) onChange(""); }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="季語を絞り込み..."
          className={`w-full px-3.5 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4849A] focus:border-transparent bg-white transition-all pr-8 ${selected ? "border-[#D4849A] text-[#B83250] font-medium" : "border-[#E8D8CC] text-[#2C1810]"}`}
        />
        {selected && (
          <button onClick={handleClear} className="absolute inset-y-0 right-2.5 flex items-center text-[#B5A49A] hover:text-[#7A6558]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        )}
        {isOpen && filteredKigo.length > 0 && (
          <ul ref={listRef} className="absolute z-50 mt-1 w-full max-h-48 overflow-auto bg-white border border-[#E8D8CC] rounded-xl shadow-lg">
            {filteredKigo.map(([text], idx) => (
              <li key={text} onClick={() => handleSelect(text)}
                className={`px-3.5 py-2 text-sm cursor-pointer transition-colors ${idx === highlightedIndex ? "bg-[#FDF0F3] text-[#B83250]" : text === selected ? "bg-[#FAF6F1] font-medium" : "hover:bg-[#FAF6F1] text-[#2C1810]"}`}>
                {text}
              </li>
            ))}
          </ul>
        )}
        {isOpen && filteredKigo.length === 0 && inputValue && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-[#E8D8CC] rounded-xl shadow-lg px-3.5 py-2.5 text-sm text-[#B5A49A]">
            該当する季語がありません
          </div>
        )}
      </div>
    </div>
  );
}
