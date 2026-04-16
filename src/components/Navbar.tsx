"use client";

import { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  onWriteClick?: () => void;
}

export default function Navbar({ onWriteClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-[18px] font-semibold tracking-tight text-[#161616]"
        >
          Letters.
        </Link>

        {/* Nav links — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-7">
          <a
            href="/#letters"
            className="text-[14px] font-medium text-[#6B6B6B] hover:text-[#161616] transition-colors"
          >
            Listy
          </a>
          <Link
            href="/about"
            className="text-[14px] font-medium text-[#6B6B6B] hover:text-[#161616] transition-colors"
          >
            O projekcie
          </Link>
          <Link
            href="/help"
            className="text-[14px] font-medium text-[#6B6B6B] hover:text-[#161616] transition-colors"
          >
            Pomoc
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href="https://buymeacoffee.com/letters.project"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-5 py-2.5 text-[14px] font-medium text-[#525252] shadow-[inset_0_0_0_1px_#E5E5E5] hover:shadow-[inset_0_0_0_1px_#BFBFBF] hover:text-[#161616] transition-all hidden sm:inline-flex items-center gap-1.5"
          >
            ☕ Wesprzyj
          </a>
          {onWriteClick ? (
            <button
              onClick={onWriteClick}
              className="hidden md:block bg-[#161616] text-white rounded-lg px-6 py-2.5 text-[14px] font-medium hover:opacity-85 transition-opacity cursor-pointer"
            >
              Napisz list
            </button>
          ) : (
            <Link
              href="/"
              className="hidden md:block bg-[#161616] text-white rounded-lg px-6 py-2.5 text-[14px] font-medium hover:opacity-85 transition-opacity"
            >
              Napisz list
            </Link>
          )}

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 cursor-pointer"
            aria-label="Menu"
          >
            <span
              className={`block h-[2px] w-5 bg-[#161616] transition-all origin-center ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`block h-[2px] w-5 bg-[#161616] transition-all ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-[2px] w-5 bg-[#161616] transition-all origin-center ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-[#F0F0F0] bg-white px-6 py-4 flex flex-col gap-4">
          <a
            href="/#letters"
            onClick={() => setMenuOpen(false)}
            className="text-[15px] font-medium text-[#161616]"
          >
            Listy
          </a>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="text-[15px] font-medium text-[#161616]"
          >
            O projekcie
          </Link>
          <Link
            href="/help"
            onClick={() => setMenuOpen(false)}
            className="text-[15px] font-medium text-[#161616]"
          >
            Pomoc
          </Link>
          <a
            href="https://buymeacoffee.com/letters.project"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] font-medium text-[#525252]"
          >
            ☕ Wesprzyj
          </a>
          {onWriteClick ? (
            <button
              onClick={() => { setMenuOpen(false); onWriteClick(); }}
              className="bg-[#161616] text-white rounded-lg py-3 text-[14px] font-medium cursor-pointer"
            >
              Napisz list
            </button>
          ) : (
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="bg-[#161616] text-white rounded-lg py-3 text-[14px] font-medium text-center"
            >
              Napisz list
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
