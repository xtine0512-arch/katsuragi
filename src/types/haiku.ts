export interface HaikuRecord {
  id: number;
  haiku: string;
  region: string;
  author: string;
  season: string;
  kigo: string;
  kigoNumber: number;
  split1?: number;  // 五七五: 5モーラ目後の文字インデックス
  split2?: number;  // 五七五: 12モーラ目後の文字インデックス
  correctionNote?: string;
  correctionContent?: string;
  preCorrectionSeason?: string;
}

export interface HaikuMeta {
  seasons: string[];
  kigo: [string, number][]; // [kigoText, kigoNumber] sorted by kigoNumber
  regions: string[];
  authors: string[];
}

export interface FilterState {
  searchText: string;
  seasons: Set<string>;
  kigo: string;        // empty = all
  region: string;      // empty = all
  authorText: string;  // substring match, empty = all
}
