"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WriteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PendingLetter {
  id: number;
  greeting: string;
  body: string;
  author: string;
  status: "pending";
}

export default function WriteModal({ isOpen, onClose }: WriteModalProps) {
  const [greeting, setGreeting] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setGreeting("");
        setBody("");
        setAuthor("");
        setSubmitted(false);
      }, 300);
    }
  }, [isOpen]);

  const charCount = body.length;
  const isSubmitDisabled = body.trim().length < 20;

  const getCharCountColor = () => {
    if (charCount >= 3000) return "text-[#DC2626]";
    if (charCount >= 2700) return "text-[#B45309]";
    return "text-[#767676]";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    const letter: PendingLetter = {
      id: Date.now(),
      greeting: greeting.trim(),
      body: body.trim(),
      author: author.trim(),
      status: "pending",
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem("letters-pending") || "[]"
      ) as PendingLetter[];
      localStorage.setItem(
        "letters-pending",
        JSON.stringify([...existing, letter])
      );
    } catch {
      // localStorage unavailable — silently ignore
    }

    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="write-modal-overlay"
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
            key="write-modal-container"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#FDFCFA] rounded-md w-full max-w-[680px] max-h-[90vh] overflow-y-auto"
            style={{
              padding: "48px 52px",
              boxShadow: "0 24px 80px rgba(0,0,0,0.15)",
            }}
          >
            {/* Paper lines — start ~120px from top to skip header */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-50 pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(transparent 0px, transparent 31px, #E8E4DE 31px, #E8E4DE 32px)",
                backgroundPositionY: "120px",
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
            {submitted ? (
              /* Success state */
              <div className="relative z-10 text-center py-16">
                <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 16.5L13 22.5L25 10"
                      stroke="#525252"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-[22px] font-bold text-[#161616] mb-3">
                  Dziękujemy za Twój list.
                </h3>
                <p className="text-[15px] text-[#525252] max-w-[360px] mx-auto">
                  Trafił do kolejki moderacji. Gdy zostanie zatwierdzony,
                  pojawi się na stronie i ktoś będzie mógł go przeczytać.
                </p>
              </div>
            ) : (
              /* Form state */
              <div className="relative z-10">
                {/* Header */}
                <h2 className="text-2xl font-bold tracking-tight text-[#161616] mb-2">
                  Napisz swój list
                </h2>
                <p className="text-sm text-[#525252] mb-8">
                  Twoje słowa są anonimowe. Po wysłaniu list trafi do moderacji
                  — opublikujemy go, gdy będzie gotowy.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Field 1: Greeting */}
                  <div className="mb-7">
                    <label
                      htmlFor="write-greeting"
                      className="block mb-2"
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#767676",
                      }}
                    >
                      Do kogo piszesz?
                    </label>
                    <input
                      id="write-greeting"
                      type="text"
                      value={greeting}
                      onChange={(e) => setGreeting(e.target.value)}
                      maxLength={100}
                      placeholder="np. Do kogoś, kto to czyta —"
                      className="w-full border-none border-b-[1.5px] bg-transparent py-2.5 text-[16px] font-medium text-[#161616] placeholder:text-gray-300 focus:outline-none focus:border-black transition-colors"
                      style={{ borderBottom: "1.5px solid #E5E5E5" }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderBottomColor = "#161616")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderBottomColor = "#E5E5E5")
                      }
                    />
                  </div>

                  {/* Field 2: Letter body */}
                  <div className="mb-7">
                    <label
                      htmlFor="write-body"
                      className="block mb-2"
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#767676",
                      }}
                    >
                      Twój list
                    </label>
                    <textarea
                      id="write-body"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      maxLength={3000}
                      placeholder="Pisz to, co czujesz. Nie musisz szukać idealnych słów. Wystarczy, że są prawdziwe."
                      className="w-full min-h-[280px] border-none bg-transparent text-[16px] leading-[2] text-[#525252] resize-y placeholder:text-gray-300 focus:outline-none"
                    />
                    <div
                      className={`text-xs font-medium text-right mt-2 ${getCharCountColor()}`}
                    >
                      {charCount} / 3000
                    </div>
                  </div>

                  {/* Field 3: Author / Signature */}
                  <div className="mb-2">
                    <label
                      htmlFor="write-author"
                      className="block mb-2"
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#767676",
                      }}
                    >
                      Podpis (opcjonalny)
                    </label>
                    <input
                      id="write-author"
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      maxLength={40}
                      placeholder="— Anonim"
                      className="w-[200px] border-none border-b-[1.5px] bg-transparent py-2.5 text-[16px] font-semibold italic text-[#161616] placeholder:text-gray-300 focus:outline-none focus:border-black transition-colors"
                      style={{ borderBottom: "1.5px solid #E5E5E5" }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderBottomColor = "#161616")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderBottomColor = "#E5E5E5")
                      }
                    />
                  </div>

                  {/* Footer */}
                  <div className="mt-8 pt-6 border-t border-[#E8E4DE] flex justify-between items-center">
                    <p className="text-[13px] text-[#6B6B6B] max-w-[320px]">
                      Twój list jest w pełni anonimowy. Nie zbieramy żadnych
                      danych osobowych.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitDisabled}
                      className="bg-[#161616] text-white rounded-[10px] px-9 py-3.5 font-semibold text-[15px] transition-opacity"
                      style={{
                        opacity: isSubmitDisabled ? 0.35 : 1,
                        cursor: isSubmitDisabled ? "not-allowed" : "pointer",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitDisabled)
                          e.currentTarget.style.opacity = "0.85";
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitDisabled)
                          e.currentTarget.style.opacity = "1";
                      }}
                    >
                      Wyślij list
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
