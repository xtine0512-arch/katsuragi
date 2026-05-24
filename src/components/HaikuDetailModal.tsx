"use client";

import { useEffect } from "react";
import type { HaikuRecord } from "@/types/haiku";

const SEASON_COLORS: Record<string, string> = {
  新年: "bg-[#F5DEDE] text-[#B83250]",
  春:   "bg-[#F9E4EE] text-[#B83250]",
  夏:   "bg-[#DFF0F9] text-[#3270B8]",
  秋:   "bg-[#FBF0DA] text-[#956A20]",
  冬:   "bg-[#E8EFF5] text-[#3D5A78]",
  晩冬: "bg-[#E2E8F0] text-[#3D5A78]",
};

function splitParts(record: HaikuRecord): [string, string, string] {
  const { haiku, split1, split2 } = record;
  if (split1 && split2 && split1 < split2 && split2 < haiku.length) {
    return [haiku.slice(0, split1), haiku.slice(split1, split2), haiku.slice(split2)];
  }
  return [haiku, "", ""];
}

interface HaikuDetailModalProps {
  record: HaikuRecord;
  onClose: () => void;
}

export function HaikuDetailModal({ record, onClose }: HaikuDetailModalProps) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const seasonColor = SEASON_COLORS[record.season] ?? "bg-[#E8EFF5] text-[#3D5A78]";
  const [p1, p2, p3] = splitParts(record);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full sm:max-w-md bg-[#FAF6F1] sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col max-h-[92dvh] sm:max-h-[85vh] overflow-hidden">
        {/* ハンドル */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-[#D8C8BE] rounded-full" />
        </div>

        {/* ヘッダー */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-sm text-[#7A6558] hover:text-[#2C1810] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            戻る
          </button>
        </div>

        {/* 内容 */}
        <div className="flex-1 overflow-y-auto px-5 pb-8">
          {/* 五七五 縦書きカード */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8D8CC] flex items-center justify-center min-h-[200px] py-8 px-6 mb-6">
            <p className="haiku-vertical text-[22px] text-[#2C1810]">
              {p1}
              {p2 && <><br />{p2}</>}
              {p3 && <><br />{p3}</>}
            </p>
          </div>

          {/* メタ情報 */}
          <div className="border border-[#E8D8CC] rounded-2xl overflow-hidden bg-white">
            <Row label="作者" value={record.author} />
            <Row label="地区" value={record.region} />
            <Row label="季語" value={record.kigo} />
            <Row
              label="季節"
              value={
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${seasonColor}`}>
                  {record.season}
                </span>
              }
            />
          </div>

          <p className="text-center text-xs text-[#B5A49A] mt-4">No. {record.id.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center border-b border-[#F0E4DA] last:border-b-0 px-5 py-3.5">
      <span className="w-12 text-xs font-semibold text-[#B5A49A] flex-shrink-0">{label}</span>
      <span className="text-sm text-[#2C1810] font-medium">{value}</span>
    </div>
  );
}
