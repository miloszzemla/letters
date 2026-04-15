"use client";

import { motion } from "framer-motion";
import { Letter } from "@/lib/types";

const MONTHS_PL = [
  "sty", "lut", "mar", "kwi", "maj", "cze",
  "lip", "sie", "wrz", "paź", "lis", "gru",
];

function formatDatePL(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getDate()} ${MONTHS_PL[d.getMonth()]} ${d.getFullYear()}`;
}

const rotations = [-2, 1.5, -1, 2, -2.5, 1, -1.5, 2.5, -1.8, 1.2, -2.2, 1.8];

interface LetterCardProps {
  letter: Letter;
  index: number;
  onClick: () => void;
}

export default function LetterCard({ letter, index, onClick }: LetterCardProps) {
  const rotation = rotations[index % 12];

  return (
    <motion.div
      onClick={onClick}
      initial={{ rotate: rotation }}
      style={{
        outline: "1px solid rgba(0,0,0,0.04)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(16,24,40,0.06)",
      }}
      whileHover={{
        rotate: 0,
        y: -10,
        scale: 1.02,
        zIndex: 10,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08), 0 20px 48px rgba(16,24,40,0.1)",
      }}
      transition={{
        duration: 0.45,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="relative bg-[#FDFCFA] rounded-sm min-h-[340px] flex flex-col justify-between cursor-pointer overflow-hidden"
    >
      {/* Paper lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(transparent 0px, transparent 31px, #E8E4DE 31px, #E8E4DE 32px)",
        }}
      />

      {/* Left margin line */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 w-px bg-[#E0C9B5] opacity-40"
        style={{ left: "28px" }}
      />

      {/* Corner fold */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-7 h-7 rounded-tr-sm"
        style={{
          background: "linear-gradient(225deg, white 50%, #EDE9E3 50%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-[40px_36px_32px]">
        <div>
          <p className="text-sm font-medium text-[#6B6B6B] mb-4">
            {letter.greeting}
          </p>
          <p
            className="text-[15.5px] leading-[2] text-[#525252] overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 8,
              WebkitBoxOrient: "vertical",
            }}
          >
            {letter.body}
          </p>
        </div>

        <div className="flex justify-between items-end mt-6">
          <span className="text-sm font-semibold text-[#161616] italic">
            — {letter.author}
          </span>
          <span className="text-xs text-[#767676]">
            {formatDatePL(letter.createdAt)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
