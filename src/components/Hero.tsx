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
      className={`hidden md:block absolute pointer-events-none max-w-[175px] rounded-sm p-4 text-[12px] leading-[1.6] text-[#525252] ${className}`}
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
    <section className="relative min-h-[620px] flex items-center justify-center overflow-hidden px-12 py-20">
      {/* Mini letters */}
      <MiniLetter
        text="Dziś wstałam z łóżka. I to jest moja siła."
        className="top-[7%] left-[3%] rotate-[-6deg]"
      />
      <MiniLetter
        text="Tata walczył. I wygrał."
        className="top-[62%] left-[4%] rotate-[4deg]"
      />
      <MiniLetter
        text="Usiadł obok. Nie pytał. Był. Dziękuję."
        className="top-[10%] right-[4%] rotate-[5deg]"
      />
      <MiniLetter
        text="Przebiegłem trzy kilometry. To mój maraton."
        className="top-[58%] right-[3%] rotate-[-4deg]"
      />
      <MiniLetter
        text="Zadzwoniłem. Po prostu słuchał."
        className="bottom-[6%] left-[9%] rotate-[3deg]"
      />
      <MiniLetter
        text="Przyjechał. Został tydzień. Zmienił wszystko."
        className="bottom-[8%] right-[7%] rotate-[-5deg]"
      />

      {/* Center content */}
      <div className="relative z-10 text-center max-w-[680px]">
        {/* Big quote mark */}
        <span
          className="block mb-5 leading-none text-[#E5E5E5]"
          style={{ fontFamily: "Georgia, serif", fontSize: "120px" }}
          aria-hidden="true"
        >
          &ldquo;
        </span>

        {/* Quote */}
        <h1 className="text-[44px] font-bold leading-[1.35] tracking-tight text-[#161616] mb-4">
          Zostań jeszcze jeden dzień.<br />
          Tylko jeden. Obiecuję, że kiedyś<br />
          przestaniesz liczyć.
        </h1>

        {/* Author */}
        <p className="text-sm text-[#6B6B6B] font-medium mb-10">
          — z listu anonimowego autora
        </p>

        {/* Tagline */}
        <p className="text-base text-[#525252] leading-relaxed max-w-[440px] mx-auto mb-9">
          Miejsce, gdzie ludzie piszą listy, które mogą uratować komuś dzień.
          Albo życie.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onWriteClick}
            className="bg-[#161616] text-white rounded-[10px] px-8 py-3.5 font-semibold text-[15px] hover:opacity-85 transition-opacity cursor-pointer"
          >
            Napisz swój list
          </button>
          <a
            href="#letters"
            className="bg-transparent text-[#161616] border-[1.5px] border-[#E5E5E5] rounded-[10px] px-8 py-3.5 font-medium text-[15px] hover:border-[#161616] transition-colors"
          >
            Czytaj listy
          </a>
        </div>
      </div>
    </section>
  );
}
