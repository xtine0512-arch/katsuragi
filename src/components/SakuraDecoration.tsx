export function SakuraDecoration({ className = "" }: { className?: string }) {
  return (
    <svg
      width="140"
      height="120"
      viewBox="0 0 140 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Main branch */}
      <path
        d="M8 115 C28 95 55 70 80 45 C98 28 118 14 134 4"
        stroke="#C4948E" strokeWidth="2.2" strokeLinecap="round"
      />
      {/* Sub branch 1 */}
      <path
        d="M68 72 C78 60 88 46 98 36"
        stroke="#C4948E" strokeWidth="1.6" strokeLinecap="round"
      />
      {/* Sub branch 2 */}
      <path
        d="M40 96 C52 84 62 76 72 68"
        stroke="#C4948E" strokeWidth="1.4" strokeLinecap="round"
      />
      {/* Sub branch 3 */}
      <path
        d="M80 45 C84 38 90 28 96 22"
        stroke="#C4948E" strokeWidth="1.3" strokeLinecap="round"
      />

      {/* Flower 1 — 5 petals using circles */}
      <g transform="translate(98, 32)">
        <ellipse cx="0" cy="-6" rx="5" ry="7" fill="#F5C2C2" transform="rotate(0)"/>
        <ellipse cx="0" cy="-6" rx="5" ry="7" fill="#F5C2C2" transform="rotate(72)"/>
        <ellipse cx="0" cy="-6" rx="5" ry="7" fill="#F0B8B8" transform="rotate(144)"/>
        <ellipse cx="0" cy="-6" rx="5" ry="7" fill="#F5C2C2" transform="rotate(216)"/>
        <ellipse cx="0" cy="-6" rx="5" ry="7" fill="#F5C2C2" transform="rotate(288)"/>
        <circle cx="0" cy="0" r="3" fill="#FAE8E8"/>
        <circle cx="0" cy="0" r="1.2" fill="#E8A0A0"/>
      </g>

      {/* Flower 2 — smaller */}
      <g transform="translate(70, 65)">
        <ellipse cx="0" cy="-5" rx="4" ry="6" fill="#F8CCCC" transform="rotate(0)"/>
        <ellipse cx="0" cy="-5" rx="4" ry="6" fill="#F8CCCC" transform="rotate(72)"/>
        <ellipse cx="0" cy="-5" rx="4" ry="6" fill="#F2BEBE" transform="rotate(144)"/>
        <ellipse cx="0" cy="-5" rx="4" ry="6" fill="#F8CCCC" transform="rotate(216)"/>
        <ellipse cx="0" cy="-5" rx="4" ry="6" fill="#F8CCCC" transform="rotate(288)"/>
        <circle cx="0" cy="0" r="2.5" fill="#FAE8E8"/>
        <circle cx="0" cy="0" r="1" fill="#E8A0A0"/>
      </g>

      {/* Flower 3 — smallest */}
      <g transform="translate(44, 92)">
        <ellipse cx="0" cy="-4.5" rx="3.5" ry="5.5" fill="#F8CCCC" transform="rotate(0)"/>
        <ellipse cx="0" cy="-4.5" rx="3.5" ry="5.5" fill="#F8CCCC" transform="rotate(72)"/>
        <ellipse cx="0" cy="-4.5" rx="3.5" ry="5.5" fill="#F2BEBE" transform="rotate(144)"/>
        <ellipse cx="0" cy="-4.5" rx="3.5" ry="5.5" fill="#F8CCCC" transform="rotate(216)"/>
        <ellipse cx="0" cy="-4.5" rx="3.5" ry="5.5" fill="#F8CCCC" transform="rotate(288)"/>
        <circle cx="0" cy="0" r="2" fill="#FAE8E8"/>
      </g>

      {/* Bud on sub-branch 3 */}
      <g transform="translate(96, 22)">
        <ellipse cx="0" cy="-4" rx="3" ry="5" fill="#F8D0D0" transform="rotate(0)"/>
        <ellipse cx="0" cy="-4" rx="3" ry="5" fill="#F8D0D0" transform="rotate(72)"/>
        <ellipse cx="0" cy="-4" rx="3" ry="5" fill="#F2BEBE" transform="rotate(144)"/>
        <ellipse cx="0" cy="-4" rx="3" ry="5" fill="#F8D0D0" transform="rotate(216)"/>
        <ellipse cx="0" cy="-4" rx="3" ry="5" fill="#F8D0D0" transform="rotate(288)"/>
        <circle cx="0" cy="0" r="1.8" fill="#FAE8E8"/>
      </g>

      {/* Falling petals */}
      <ellipse cx="118" cy="58" rx="2.5" ry="4.5" fill="#F8CCCC" opacity="0.75" transform="rotate(25 118 58)"/>
      <ellipse cx="108" cy="80" rx="2" ry="3.5" fill="#F5C2C2" opacity="0.65" transform="rotate(-15 108 80)"/>
      <ellipse cx="128" cy="44" rx="2" ry="3.5" fill="#F8D0D0" opacity="0.6" transform="rotate(50 128 44)"/>
      <ellipse cx="82" cy="105" rx="1.8" ry="3" fill="#F5C2C2" opacity="0.55" transform="rotate(-8 82 105)"/>
    </svg>
  );
}
