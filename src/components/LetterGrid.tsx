"use client";

import { useState } from "react";
import { Letter } from "@/lib/types";
import LetterCard from "./LetterCard";
import ReadModal from "./ReadModal";

interface LetterGridProps {
  letters: Letter[];
}

export default function LetterGrid({ letters }: LetterGridProps) {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);

  return (
    <section id="letters" className="px-12 pb-24 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-11 py-5">
        {letters.map((letter, index) => (
          <LetterCard
            key={letter.id}
            letter={letter}
            index={index}
            onClick={() => setSelectedLetter(letter)}
          />
        ))}
      </div>

      <ReadModal
        letter={selectedLetter}
        onClose={() => setSelectedLetter(null)}
      />
    </section>
  );
}
