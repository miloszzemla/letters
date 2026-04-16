const paperLinesBg =
  "repeating-linear-gradient(to bottom, transparent, transparent 31px, #E8E4DE 31px, #E8E4DE 32px)";

export default function BMCSection() {
  return (
    <section className="py-16 md:py-20 px-5">
      <div
        className="relative max-w-[540px] mx-auto rounded-lg p-6 md:p-10"
        style={{
          background: `${paperLinesBg}, #FDFCFA`,
          backgroundPositionY: "8px",
          boxShadow:
            "0 2px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
          outline: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        {/* Left margin line */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 w-px pointer-events-none rounded-l-lg"
          style={{ left: "32px", backgroundColor: "#E0C9B5", opacity: 0.35 }}
        />

        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <img
            src="/logo-letters.svg"
            alt="Letters."
            className="w-14 h-14"
          />
        </div>

        <h3 className="text-xl md:text-[22px] font-bold text-[#161616] text-center mb-2">
          Wesprzyj Letters.
        </h3>
        <p className="text-[14px] md:text-[15px] text-[#525252] text-center max-w-[380px] mx-auto mb-8">
          Letters. to projekt non-profit. Każda wpłata pomaga utrzymać
          to miejsce — serwer, domenę i czas poświęcony moderacji.
        </p>

        {/* Buy Me a Coffee button */}
        <a
          href="https://buymeacoffee.com/letters.project"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full bg-[#FFDD00] hover:bg-[#FFCE00] active:scale-[0.98] text-[#161616] rounded-lg py-3.5 font-bold text-[15px] transition-all"
        >
          <span className="text-xl leading-none">&#9749;</span>
          Buy me a coffee
        </a>

        <p className="text-[12px] text-[#737373] text-center mt-4">
          Każda kawa pomaga nam dalej działać.
        </p>
      </div>
    </section>
  );
}
