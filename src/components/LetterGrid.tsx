"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Letter } from "@/lib/types";
import LetterCard from "./LetterCard";
import ReadModal from "./ReadModal";

const LETTERS_PER_PAGE = 9;

interface LetterGridProps {
  letters: Letter[];
}

export default function LetterGrid({ letters }: LetterGridProps) {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [visibleCount, setVisibleCount] = useState(LETTERS_PER_PAGE);

  const visibleLetters = letters.slice(0, visibleCount);
  const hasMore = visibleCount < letters.length;
  const remaining = letters.length - visibleCount;

  return (
    <section id="letters" className="px-5 md:px-12 pb-24 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-11 py-5">
        <AnimatePresence initial={false}>
          {visibleLetters.map((letter, index) => (
            <motion.div
              key={letter.id}
              initial={index >= visibleCount - LETTERS_PER_PAGE ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index >= visibleCount - LETTERS_PER_PAGE ? (index % LETTERS_PER_PAGE) * 0.05 : 0 }}
            >
              <LetterCard
                letter={letter}
                index={index}
                onClick={() => setSelectedLetter(letter)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisibleCount((prev) => prev + LETTERS_PER_PAGE)}
            className="group flex items-center gap-2 bg-transparent text-[#161616] border-[1.5px] border-[#E5E5E5] rounded-[10px] px-8 py-3.5 font-medium text-[15px] hover:border-[#161616] transition-colors cursor-pointer"
          >
            Pokaż więcej listów
            <span className="text-[13px] text-[#767676] group-hover:text-[#525252] transition-colors">
              ({remaining})
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="ml-1 transition-transform group-hover:translate-y-0.5"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      <ReadModal
        letter={selectedLetter}
        onClose={() => setSelectedLetter(null)}
      />
    </section>
  );
}
