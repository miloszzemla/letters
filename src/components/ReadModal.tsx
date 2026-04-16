"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Letter } from "@/lib/types";

const MONTHS_PL = [
  "sty", "lut", "mar", "kwi", "maj", "cze",
  "lip", "sie", "wrz", "paź", "lis", "gru",
];

function formatDatePL(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getDate()} ${MONTHS_PL[d.getMonth()]} ${d.getFullYear()}`;
}

interface ReadModalProps {
  letter: Letter | null;
  onClose: () => void;
}

export default function ReadModal({ letter, onClose }: ReadModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!letter) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [letter, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (letter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [letter]);

  return (
    <AnimatePresence>
      {letter && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[1000] flex items-center justify-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            padding: "40px 24px",
          }}
        >
          <motion.div
            key="modal-container"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#FDFCFA] rounded-md w-full max-w-[640px] max-h-[85vh] overflow-y-auto p-6 sm:p-[56px_52px_48px]"
            style={{
              boxShadow: "0 24px 80px rgba(0,0,0,0.15)",
            }}
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
              className="absolute top-0 bottom-0 w-px pointer-events-none"
              style={{
                left: "44px",
                backgroundColor: "#E0C9B5",
                opacity: 0.35,
              }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Zamknij"
              className="absolute top-5 right-5 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-100 transition-colors z-20"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="#525252"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Content */}
            <div className="relative z-10">
              <p className="text-[15px] text-[#6B6B6B] mb-6">
                {letter.greeting}
              </p>

              <p className="text-[17px] leading-[2] text-[#525252] whitespace-pre-line">
                {letter.body}
              </p>

              <div className="mt-10 pt-5 border-t border-[#E8E4DE] flex justify-between items-end">
                <span className="text-base font-semibold text-[#161616] italic">
                  — {letter.author}
                </span>
                <span className="text-[13px] text-[#636363]">
                  {formatDatePL(letter.createdAt)}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
