"use client";

interface HeroProps {
  onWriteClick: () => void;
}

const paperLinesBg =
  "repeating-linear-gradient(to bottom, transparent, transparent 17px, #E8E4DE 17px, #E8E4DE 18px)";

interface MiniLetterProps {
  text: string;
  className: string;
}

function MiniLetter({ text, className }: MiniLetterProps) {
  return (
    <div
      className={`absolute pointer-events-none rounded-sm p-3 md:p-4 text-[10px] md:text-[12px] leading-[1.6] text-[#525252] ${className}`}
      style={{
        background: `${paperLinesBg}, #FDFCFA`,
        boxShadow:
          "0 2px 16px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)",
        outline: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {text}
    </div>
  );
}

export default function Hero({ onWriteClick }: HeroProps) {
  return (
    <section className="relative min-h-[calc(100dvh-61px)] flex items-center justify-center overflow-hidden px-5 py-12 md:px-12 md:py-20">
      {/* Mini letters — mobile: 3 visible (top-left, top-right, bottom-center), desktop: all 6 */}
      <MiniLetter
        text="Dziś wstałam z łóżka. I to jest moja siła."
        className="max-w-[130px] md:max-w-[175px] top-[3%] left-[4%] md:top-[7%] md:left-[3%] rotate-[-6deg]"
      />
      <MiniLetter
        text="Tata walczył. I wygrał."
        className="hidden md:block max-w-[175px] top-[62%] left-[4%] rotate-[4deg]"
      />
      <MiniLetter
        text="Usiadł obok. Nie pytał. Był."
        className="max-w-[120px] md:max-w-[175px] top-[3%] right-[4%] md:top-[10%] md:right-[4%] rotate-[5deg]"
      />
      <MiniLetter
        text="Przebiegłem trzy kilometry. To mój maraton."
        className="hidden md:block max-w-[175px] top-[58%] right-[3%] rotate-[-4deg]"
      />
      <MiniLetter
        text="Zadzwoniłem. Po prostu słuchał."
        className="max-w-[120px] md:max-w-[175px] bottom-[3%] left-[50%] -translate-x-1/2 md:translate-x-0 md:left-[9%] md:bottom-[6%] rotate-[3deg]"
      />
      <MiniLetter
        text="Przyjechał. Został tydzień. Zmienił wszystko."
        className="hidden md:block max-w-[175px] bottom-[8%] right-[7%] rotate-[-5deg]"
      />

      {/* Center content */}
      <div className="relative z-10 text-center max-w-[680px]">
        {/* Quote */}
        <h1 className="text-[26px] md:text-[44px] font-bold leading-[1.3] md:leading-[1.35] tracking-tight text-[#161616] mb-4 text-balance">
          <span
            className="text-[#E5E5E5] text-[48px] md:text-[72px] leading-[0.5] align-top mr-1"
            style={{ fontFamily: "Georgia, serif" }}
            aria-hidden="true"
          >&ldquo;</span>
          Czasem jedno zdanie od obcego człowieka zmienia więcej niż tysiąc rad.
        </h1>

        {/* Author */}
        <p className="text-xs md:text-sm text-[#6B6B6B] font-medium mb-8 md:mb-10">
          — z listu anonimowego autora
        </p>

        {/* Tagline */}
        <p className="text-[15px] md:text-base text-[#525252] leading-relaxed max-w-[440px] mx-auto mb-8 md:mb-9">
          Miejsce, gdzie ludzie piszą listy, które mogą uratować komuś dzień.
          Albo życie.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onWriteClick}
            className="w-full sm:w-auto bg-[#161616] text-white rounded-[10px] px-8 py-3.5 font-semibold text-[15px] hover:opacity-85 transition-opacity cursor-pointer"
          >
            Napisz swój list
          </button>
          <a
            href="#letters"
            className="w-full sm:w-auto text-center bg-transparent text-[#161616] border-[1.5px] border-[#E5E5E5] rounded-[10px] px-8 py-3.5 font-medium text-[15px] hover:border-[#161616] transition-colors"
          >
            Czytaj listy
          </a>
        </div>
      </div>
    </section>
  );
}
