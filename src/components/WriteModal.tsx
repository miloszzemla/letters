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

  const handleSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
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

  const canSubmit = body.trim().length >= 20;

  const labelStyle = {
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    color: "#767676",
  };

  const inputBorderHandlers = {
    onFocus: (e: React.FocusEvent<HTMLInputElement>) =>
      (e.currentTarget.style.borderBottomColor = "#161616"),
    onBlur: (e: React.FocusEvent<HTMLInputElement>) =>
      (e.currentTarget.style.borderBottomColor = "#E5E5E5"),
  };

  const formContent = submitted ? (
    <div className="relative z-10 text-center py-16 md:py-16">
      <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M7 16.5L13 22.5L25 10" stroke="#525252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
    <div className="relative z-10">
      <h2 className="text-2xl font-bold tracking-tight text-[#161616] mb-2">
        Napisz swój list
      </h2>
      <p className="text-sm text-[#525252] mb-8">
        Twoje słowa są anonimowe. Po wysłaniu list trafi do moderacji
        — opublikujemy go, gdy będzie gotowy.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-7">
          <label htmlFor="write-greeting" className="block mb-2" style={labelStyle}>
            Do kogo piszesz?
          </label>
          <input
            id="write-greeting"
            type="text"
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
            maxLength={100}
            placeholder="np. Do kogoś, kto to czyta —"
            className="w-full border-none bg-transparent py-2.5 text-[16px] font-medium text-[#161616] placeholder:text-gray-300 focus:outline-none transition-colors"
            style={{ borderBottom: "1.5px solid #E5E5E5" }}
            {...inputBorderHandlers}
          />
        </div>

        <div className="mb-7">
          <label htmlFor="write-body" className="block mb-2" style={labelStyle}>
            Twój list
          </label>
          <textarea
            id="write-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={3000}
            placeholder="Pisz to, co czujesz. Nie musisz szukać idealnych słów. Wystarczy, że są prawdziwe."
            className="w-full min-h-[200px] md:min-h-[280px] border-none bg-transparent text-[16px] leading-[2] text-[#525252] resize-y placeholder:text-gray-300 focus:outline-none"
          />
          <div className={`text-xs font-medium text-right mt-2 ${getCharCountColor()}`}>
            {charCount} / 3000
          </div>
        </div>

        <div className="mb-2">
          <label htmlFor="write-author" className="block mb-2" style={labelStyle}>
            Podpis (opcjonalny)
          </label>
          <input
            id="write-author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            maxLength={40}
            placeholder="— Anonim"
            className="w-full md:w-[200px] border-none bg-transparent py-2.5 text-[16px] font-semibold italic text-[#161616] placeholder:text-gray-300 focus:outline-none transition-colors"
            style={{ borderBottom: "1.5px solid #E5E5E5" }}
            {...inputBorderHandlers}
          />
        </div>

        {/* Desktop footer — hidden on mobile */}
        <div className="hidden md:flex mt-8 pt-6 border-t border-[#E8E4DE] justify-between items-center">
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
          >
            Wyślij list
          </button>
        </div>

        {/* Extra bottom padding on mobile so content isn't hidden behind sticky button */}
        <div className="h-24 md:hidden" />
      </form>
    </div>
  );

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
          className="fixed inset-0 z-[1000] flex items-end md:items-center justify-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
          }}
        >
          <motion.div
            key="write-modal-container"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#FDFCFA] w-full h-[100dvh] md:h-auto md:max-w-[680px] md:rounded-md md:max-h-[90vh]"
            style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.15)" }}
          >
            <div className="h-full overflow-y-auto p-5 pt-14 md:p-[48px_52px]">
              {/* Paper lines */}
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
                style={{ left: "44px", backgroundColor: "#E0C9B5", opacity: 0.35 }}
              />

              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Zamknij"
                className="absolute top-4 right-4 md:top-5 md:right-5 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-100 transition-colors z-20"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M12 4L4 12M4 4L12 12" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {formContent}
            </div>

            {/* Mobile sticky submit button — slides up when canSubmit */}
            {!submitted && (
              <AnimatePresence>
                {canSubmit && (
                  <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="md:hidden fixed bottom-0 left-0 right-0 z-[1001] bg-white border-t border-[#E5E5E5] p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
                  >
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="w-full bg-[#161616] text-white rounded-[10px] py-4 font-semibold text-[15px] active:opacity-85 transition-opacity cursor-pointer"
                    >
                      Wyślij list
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
