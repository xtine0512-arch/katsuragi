export function SakuraDecoration({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      width="140"
      height="120"
      viewBox="0 0 140 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Main branch — 少し濃い色で視認性向上 */}
      <path
        d="M8 115 C28 95 55 70 80 45 C98 28 118 14 134 4"
        stroke="#B07870" strokeWidth="2.8" strokeLinecap="round"
      />
      {/* Sub branch 1 */}
      <path
        d="M68 72 C78 60 88 46 98 36"
        stroke="#B07870" strokeWidth="2.0" strokeLinecap="round"
      />
      {/* Sub branch 2 */}
      <path
        d="M40 96 C52 84 62 76 72 68"
        stroke="#B07870" strokeWidth="1.8" strokeLinecap="round"
      />
      {/* Sub branch 3 */}
      <path
        d="M80 45 C84 38 90 28 96 22"
        stroke="#B07870" strokeWidth="1.6" strokeLinecap="round"
      />

      {/* Flower 1 — 5 petals */}
      <g transform="translate(98, 32)">
        <ellipse cx="0" cy="-6" rx="5.5" ry="7.5" fill="#EDB0B8" transform="rotate(0)"/>
        <ellipse cx="0" cy="-6" rx="5.5" ry="7.5" fill="#EDB0B8" transform="rotate(72)"/>
        <ellipse cx="0" cy="-6" rx="5.5" ry="7.5" fill="#E8A8B0" transform="rotate(144)"/>
        <ellipse cx="0" cy="-6" rx="5.5" ry="7.5" fill="#EDB0B8" transform="rotate(216)"/>
        <ellipse cx="0" cy="-6" rx="5.5" ry="7.5" fill="#EDB0B8" transform="rotate(288)"/>
        <circle cx="0" cy="0" r="3.5" fill="#F5D8DC"/>
        <circle cx="0" cy="0" r="1.5" fill="#D4849A"/>
      </g>

      {/* Flower 2 — smaller */}
      <g transform="translate(70, 65)">
        <ellipse cx="0" cy="-5" rx="4.5" ry="6.5" fill="#F0B8C0" transform="rotate(0)"/>
        <ellipse cx="0" cy="-5" rx="4.5" ry="6.5" fill="#F0B8C0" transform="rotate(72)"/>
        <ellipse cx="0" cy="-5" rx="4.5" ry="6.5" fill="#EAB0B8" transform="rotate(144)"/>
        <ellipse cx="0" cy="-5" rx="4.5" ry="6.5" fill="#F0B8C0" transform="rotate(216)"/>
        <ellipse cx="0" cy="-5" rx="4.5" ry="6.5" fill="#F0B8C0" transform="rotate(288)"/>
        <circle cx="0" cy="0" r="3" fill="#F5D0D4"/>
        <circle cx="0" cy="0" r="1.2" fill="#D4849A"/>
      </g>

      {/* Flower 3 — smallest */}
      <g transform="translate(44, 92)">
        <ellipse cx="0" cy="-4.5" rx="4" ry="6" fill="#F0B8C0" transform="rotate(0)"/>
        <ellipse cx="0" cy="-4.5" rx="4" ry="6" fill="#F0B8C0" transform="rotate(72)"/>
        <ellipse cx="0" cy="-4.5" rx="4" ry="6" fill="#EAB0B8" transform="rotate(144)"/>
        <ellipse cx="0" cy="-4.5" rx="4" ry="6" fill="#F0B8C0" transform="rotate(216)"/>
        <ellipse cx="0" cy="-4.5" rx="4" ry="6" fill="#F0B8C0" transform="rotate(288)"/>
        <circle cx="0" cy="0" r="2.5" fill="#F5D0D4"/>
      </g>

      {/* Bud on sub-branch 3 */}
      <g transform="translate(96, 22)">
        <ellipse cx="0" cy="-4" rx="3.5" ry="5.5" fill="#ECC0C8" transform="rotate(0)"/>
        <ellipse cx="0" cy="-4" rx="3.5" ry="5.5" fill="#ECC0C8" transform="rotate(72)"/>
        <ellipse cx="0" cy="-4" rx="3.5" ry="5.5" fill="#E6B8C0" transform="rotate(144)"/>
        <ellipse cx="0" cy="-4" rx="3.5" ry="5.5" fill="#ECC0C8" transform="rotate(216)"/>
        <ellipse cx="0" cy="-4" rx="3.5" ry="5.5" fill="#ECC0C8" transform="rotate(288)"/>
        <circle cx="0" cy="0" r="2" fill="#F5D8DC"/>
      </g>

      {/* Falling petals */}
      <ellipse cx="118" cy="58" rx="3" ry="5" fill="#F0B8C0" opacity="0.8" transform="rotate(25 118 58)"/>
      <ellipse cx="108" cy="80" rx="2.5" ry="4" fill="#EDB0B8" opacity="0.7" transform="rotate(-15 108 80)"/>
      <ellipse cx="128" cy="44" rx="2.5" ry="4" fill="#ECC0C8" opacity="0.65" transform="rotate(50 128 44)"/>
      <ellipse cx="82" cy="105" rx="2" ry="3.5" fill="#EDB0B8" opacity="0.6" transform="rotate(-8 82 105)"/>
    </svg>
  );
}
