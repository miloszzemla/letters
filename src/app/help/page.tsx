import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Pomoc — Letters.",
  description: "Numery telefonów zaufania i zasoby pomocowe",
};

const helplines = [
  {
    name: "Telefon Wsparcia Emocjonalnego",
    number: "116 123",
    tel: "116123",
    desc: "Bezpłatny, 24/7. Dla dorosłych w kryzysie emocjonalnym.",
  },
  {
    name: "Telefon Zaufania dla Dzieci i Młodzieży",
    number: "116 111",
    tel: "116111",
    desc: "Bezpłatny, 24/7. Prowadzony przez Fundację Empowering Children.",
  },
  {
    name: "Centrum Wsparcia dla osób w kryzysie psychicznym",
    number: "800 70 2222",
    tel: "800702222",
    desc: "Bezpłatny, codziennie 14:00–22:00. Fundacja Itaka.",
  },
  {
    name: "Telefon dla ofiar przemocy",
    number: "116 006",
    tel: "116006",
    desc: "Bezpłatny, 24/7. Dla ofiar przestępstw i przemocy.",
  },
  {
    name: "Numer alarmowy",
    number: "112",
    tel: "112",
    desc: "Bezpłatny, 24/7. W przypadku bezpośredniego zagrożenia życia.",
  },
];

export default function Help() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="mx-auto max-w-[640px] px-6 py-24">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-black">
          Potrzebujesz pomocy?
        </h1>
        <p className="mb-12 text-lg text-[#525252]">
          Jeśli jesteś w kryzysie lub masz myśli samobójcze — zadzwoń teraz.
          Nie musisz przez to przechodzić sam/sama.
        </p>

        {/* Polish Phone Numbers */}
        <section>
          <h2 className="mb-6 text-xl font-semibold text-black">
            Telefony zaufania w Polsce
          </h2>

          <div className="divide-y divide-[#F0F0F0]">
            {helplines.map((line) => (
              <div key={line.tel} className="py-5">
                <p className="text-[13px] font-medium text-[#636363] mb-1">
                  {line.name}
                </p>
                <a
                  href={`tel:${line.tel}`}
                  className="text-2xl font-bold text-black hover:underline"
                >
                  {line.number}
                </a>
                <p className="text-[13px] text-[#737373] mt-1">{line.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Organizations */}
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-semibold text-black">
            Organizacje pomocowe
          </h2>

          <div className="space-y-3">
            <a
              href="https://itaka.org.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-medium text-[#161616] underline underline-offset-4"
            >
              Fundacja Itaka — Centrum Poszukiwań Ludzi Zaginionych
            </a>
            <a
              href="https://116123.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-medium text-[#161616] underline underline-offset-4"
            >
              Instytut Psychologii Zdrowia PTP
            </a>
            <a
              href="https://fdds.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-medium text-[#161616] underline underline-offset-4"
            >
              Fundacja Dajemy Dzieciom Siłę
            </a>
          </div>
        </section>

        {/* International Help */}
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-semibold text-black">
            Pomoc międzynarodowa
          </h2>

          <div className="space-y-3">
            <a
              href="https://findahelpline.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-medium text-[#161616] underline underline-offset-4"
            >
              Find a Helpline — wyszukaj linię kryzysową w swoim kraju
            </a>
            <a
              href="https://befrienders.org"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-medium text-[#161616] underline underline-offset-4"
            >
              Befrienders Worldwide
            </a>
            <a
              href="https://iasp.info"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-medium text-[#161616] underline underline-offset-4"
            >
              International Association for Suicide Prevention
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
