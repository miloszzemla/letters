"use client";

import Link from "next/link";

interface NavbarProps {
  onWriteClick?: () => void;
}

export default function Navbar({ onWriteClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <span className="text-[18px] font-semibold tracking-tight text-[#161616]">
          Letters.
        </span>

        {/* Nav links — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-7">
          <a
            href="#letters"
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

        {/* CTA */}
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
              className="bg-[#161616] text-white rounded-lg px-6 py-2.5 text-[14px] font-medium hover:opacity-85 transition-opacity cursor-pointer"
            >
              Napisz list
            </button>
          ) : (
            <Link
              href="/"
              className="bg-[#161616] text-white rounded-lg px-6 py-2.5 text-[14px] font-medium hover:opacity-85 transition-opacity"
            >
              Napisz list
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
