"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import WriteModal from "./WriteModal";
import BottomCTA from "./BottomCTA";
import BMCSection from "./BMCSection";
import { Letter } from "@/lib/types";

interface HomePageProps {
  letters: Letter[];
  children: React.ReactNode;
}

export default function HomePage({ letters: _letters, children }: HomePageProps) {
  const [isWriteOpen, setIsWriteOpen] = useState(false);

  const handleWriteClick = () => {
    setIsWriteOpen(true);
  };

  const handleWriteClose = () => {
    setIsWriteOpen(false);
  };

  return (
    <>
      <Navbar onWriteClick={handleWriteClick} />
      <main>
        <Hero onWriteClick={handleWriteClick} />
        {children}
        <BottomCTA onWriteClick={handleWriteClick} />
        <BMCSection />
      </main>
      <WriteModal isOpen={isWriteOpen} onClose={handleWriteClose} />
    </>
  );
}
