"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onWriteClick?: () => void;
}

const menuLinks = [
  { href: "/#letters", label: "Listy" },
  { href: "/about", label: "O projekcie" },
  { href: "/help", label: "Pomoc" },
  { href: "https://buymeacoffee.com/letters.project", label: "Wesprzyj", external: true },
];

export default function Navbar({ onWriteClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
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
              className="rounded-lg px-5 py-2.5 text-[14px] font-medium text-[#525252] shadow-[inset_0_0_0_1px_#E5E5E5] hover:shadow-[inset_0_0_0_1px_#BFBFBF] hover:text-[#161616] transition-all hidden md:inline-flex items-center gap-1.5"
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
              className="md:hidden relative z-[60] flex flex-col justify-center gap-[5px] w-8 h-8 cursor-pointer"
              aria-label="Menu"
            >
              <span
                className={`block h-[2px] w-5 transition-all duration-300 origin-center ${menuOpen ? "translate-y-[7px] rotate-45 bg-white" : "bg-[#161616]"}`}
              />
              <span
                className={`block h-[2px] w-5 transition-all duration-300 ${menuOpen ? "opacity-0 bg-white" : "bg-[#161616]"}`}
              />
              <span
                className={`block h-[2px] w-5 transition-all duration-300 origin-center ${menuOpen ? "-translate-y-[7px] -rotate-45 bg-white" : "bg-[#161616]"}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 md:hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-[#111111]" />

            {/* Top bar: logo + close */}
            <div className="relative z-10 px-6 h-14 flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="text-[18px] font-semibold tracking-tight text-white"
              >
                Letters.
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center cursor-pointer"
                aria-label="Zamknij menu"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <line x1="1" y1="1" x2="17" y2="17" />
                  <line x1="17" y1="1" x2="1" y2="17" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav className="relative z-10 flex flex-col justify-center px-8 mt-8">
              {menuLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
                >
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className="block py-5 text-[28px] font-semibold text-white/90 hover:text-white transition-colors border-b border-white/10"
                    >
                      {link.label}
                    </a>
                  ) : link.href.startsWith("/") ? (
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-5 text-[28px] font-semibold text-white/90 hover:text-white transition-colors border-b border-white/10"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-5 text-[28px] font-semibold text-white/90 hover:text-white transition-colors border-b border-white/10"
                    >
                      {link.label}
                    </a>
                  )}
                </motion.div>
              ))}

              {/* CTA button */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mt-10"
              >
                {onWriteClick ? (
                  <button
                    onClick={() => { setMenuOpen(false); onWriteClick(); }}
                    className="w-full bg-white text-[#161616] rounded-lg py-4 text-[16px] font-semibold cursor-pointer"
                  >
                    Napisz list
                  </button>
                ) : (
                  <Link
                    href="/"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full bg-white text-[#161616] rounded-lg py-4 text-[16px] font-semibold text-center"
                  >
                    Napisz list
                  </Link>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
