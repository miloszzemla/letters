"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
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

  return (
    <>
      <Navbar onWriteClick={handleWriteClick} />
      <main>
        <Hero onWriteClick={handleWriteClick} />
        {children}
      </main>
      {/* Write modal will go here — isWriteOpen: {isWriteOpen.toString()} */}
    </>
  );
}
