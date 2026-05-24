#!/usr/bin/env python3
"""
Excel → JSON 変換スクリプト
「かつらぎ選集第十巻」を Next.js アプリ用 JSON に変換する。

使用方法:
  python3 scripts/convert_excel.py <Excelファイルパス>

出力:
  public/data/haiku.json  … split1/split2（五七五分割位置）を含む俳句配列
  public/data/meta.json   … フィルター用メタデータ
"""
import json, sys, os, math
from pathlib import Path

try:
    import openpyxl
except ImportError:
    sys.exit("openpyxl が必要です: pip3 install openpyxl")

try:
    from pykakasi import kakasi as KakasiClass
    _kks = KakasiClass()
    HAS_KAKASI = True
except ImportError:
    HAS_KAKASI = False

SEASON_ORDER = ["新年", "春", "夏", "秋", "冬", "晩冬"]
SMALL_KANA   = set("ぁぃぅぇぉゃゅょっァィゥェォャュョッ")

# ─── 五七五 分割 ──────────────────────────────────

def mora_count(hira: str) -> int:
    return sum(1 for c in hira if c not in SMALL_KANA and c.strip())

def _split_kana_at(orig: str, hira: str, need: int) -> int:
    """カナセグメント内で need モーラ目以後の文字インデックスを返す"""
    m = 0
    for i, h in enumerate(hira):
        if h not in SMALL_KANA and h.strip():
            m += 1
        if m == need:
            return i + 1
    return len(orig)

def find_splits_kakasi(text: str):
    """pykakasi ベース。総モーラが 14〜20 外なら None,None。"""
    segs = _kks.convert(text)
    total = sum(mora_count(s["hira"]) for s in segs)
    if not (14 <= total <= 20):
        return None, None

    cum_ch = cum_mo = 0
    s1 = s2 = None
    for s in segs:
        orig, hira = s["orig"], s["hira"]
        seg_mo = mora_count(hira)
        is_kana = all(0x3040 <= ord(c) <= 0x30FF or c in SMALL_KANA or c == "ー" for c in orig)

        for target, slot in [(5, 1), (12, 2)]:
            if slot == 1 and s1 is not None: continue
            if slot == 2 and s2 is not None: continue
            if cum_mo < target <= cum_mo + seg_mo:
                need = target - cum_mo
                if is_kana:
                    off = _split_kana_at(orig, hira, need)
                else:
                    off = len(orig)          # 漢字はセグメント末尾で丸める
                if slot == 1: s1 = cum_ch + off
                else:         s2 = cum_ch + off

        cum_ch += len(orig)
        cum_mo += seg_mo

    if s1 and s2 and s1 < s2 < len(text):
        # ── 末尾パート(第三句)のモーラを検証して微調整 ──────────────
        # pykakasi が漢字を現代読みで誤解析すると s2 が 1 文字前にずれる場合がある。
        # 例: 「面」→ めん(2モーラ) と読んで「も淑気あり(6モーラ)」になるケース。
        # 第三句が 6 モーラで、s2 を 1 進めると 5 モーラになるなら自動修正する。
        part3 = text[s2:]
        p3_mora = sum(mora_count(seg["hira"]) for seg in _kks.convert(part3))
        if p3_mora == 6 and s2 + 1 < len(text):
            shorter_mora = sum(mora_count(seg["hira"]) for seg in _kks.convert(text[s2 + 1:]))
            if shorter_mora == 5:
                s2 += 1
        return s1, s2
    return None, None

def find_splits_charcount(text: str):
    """文字数スケーリングによる近似（フォールバック）"""
    n = len(text)
    s1 = max(1, round(n * 5  / 17))
    s2 = max(s1 + 1, math.ceil(n * 12 / 17))   # ceil で第二句を長めに丸める
    s2 = min(s2, n - 1)
    return s1, s2

def find_splits(text: str):
    if HAS_KAKASI:
        try:
            s1, s2 = find_splits_kakasi(text)
            if s1 and s2:
                return s1, s2
        except Exception:
            pass
    return find_splits_charcount(text)

# ─── 補助 ────────────────────────────────────────

def clean(s) -> str:
    return str(s).replace("　", "").strip() if s else ""

# ─── メイン ──────────────────────────────────────

def convert(excel_path: str, out_dir: str):
    print(f"読み込み: {excel_path}")
    wb = openpyxl.load_workbook(excel_path, read_only=True, data_only=True)
    ws = wb["Sheet1"]
    rows = list(ws.iter_rows(min_row=2, values_only=True))
    wb.close()
    print(f"変換中: {len(rows)} 件")

    records, kigo_map, regions, authors = [], {}, set(), set()

    for i, row in enumerate(rows):
        if row[0] is None: continue

        haiku   = str(row[1]).strip() if row[1] else ""
        region  = clean(row[2])
        author  = clean(row[3])
        season  = "冬" if str(row[4]).strip() == "春or冬" else (str(row[4]).strip() if row[4] else "")
        kigo    = str(row[5]).strip() if row[5] else ""
        kigo_no = int(row[6]) if row[6] else 0

        if region:          regions.add(region)
        if author:          authors.add(author)
        if kigo and kigo_no: kigo_map[kigo] = kigo_no

        s1, s2 = find_splits(haiku) if haiku else (None, None)

        records.append({
            "id":         int(row[0]),
            "haiku":      haiku,
            "region":     region,
            "author":     author,
            "season":     season,
            "kigo":       kigo,
            "kigoNumber": kigo_no,
            "split1":     s1,
            "split2":     s2,
        })

        if (i + 1) % 500 == 0:
            print(f"  {i+1}/{len(rows)} 件…")

    # メタ
    seasons_in_data = {r["season"] for r in records}
    seasons_ordered = [s for s in SEASON_ORDER if s in seasons_in_data]
    for s in sorted(seasons_in_data - set(SEASON_ORDER)):
        seasons_ordered.append(s)

    meta = {
        "seasons": seasons_ordered,
        "kigo":    [[k, v] for k, v in sorted(kigo_map.items(), key=lambda x: x[1])],
        "regions": sorted(regions),
        "authors": sorted(authors),
    }

    haiku_out = os.path.join(out_dir, "haiku.json")
    meta_out  = os.path.join(out_dir, "meta.json")
    with open(haiku_out, "w", encoding="utf-8") as f:
        json.dump(records, f, ensure_ascii=False, separators=(",", ":"))
    with open(meta_out, "w", encoding="utf-8") as f:
        json.dump(meta, f, ensure_ascii=False, separators=(",", ":"))

    print(f"\n✅ 完了!")
    print(f"  {haiku_out}  ({os.path.getsize(haiku_out)/1024:.1f} KB, {len(records)} 件)")
    print(f"  {meta_out}   ({os.path.getsize(meta_out)/1024:.1f} KB)")
    print(f"  季節: {seasons_ordered}")
    print(f"  pykakasi 使用: {HAS_KAKASI}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(f"使用方法: python3 {sys.argv[0]} <Excelファイルパス>")
    xls = sys.argv[1]
    if not os.path.exists(xls):
        sys.exit(f"ファイルが見つかりません: {xls}")
    out = Path(__file__).parent.parent / "public" / "data"
    out.mkdir(parents=True, exist_ok=True)
    convert(xls, str(out))
