"use client";

import { useState } from "react";
import type { HaikuRecord } from "@/types/haiku";

interface CorrectionBadgeProps {
  record: HaikuRecord;
}

export function CorrectionBadge({ record }: CorrectionBadgeProps) {
  const [expanded, setExpanded] = useState(false);

  if (!record.correctionNote && !record.correctionContent && !record.preCorrectionSeason) {
    return null;
  }

  return (
    <div className="inline-block">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded border border-amber-200 hover:bg-amber-200 transition-colors"
        title="修正情報を表示"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        修正
      </button>
      {expanded && (
        <div className="mt-1 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800 space-y-0.5">
          {record.correctionNote && (
            <p><span className="font-semibold">修正根拠：</span>{record.correctionNote}</p>
          )}
          {record.correctionContent && (
            <p><span className="font-semibold">修正内容：</span>{record.correctionContent}</p>
          )}
          {record.preCorrectionSeason && (
            <p><span className="font-semibold">修正前季節：</span>{record.preCorrectionSeason}</p>
          )}
        </div>
      )}
    </div>
  );
}
