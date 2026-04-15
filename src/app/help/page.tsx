import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pomoc — Letters.",
  description: "Numery telefonów zaufania i zasoby pomocowe",
};

export default function Help() {
  return (
    <main className="min-h-screen bg-white">
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

          <div className="space-y-0 divide-y divide-[#F5F5F5]">
            {/* Number 1 */}
            <div className="border-b border-[#F5F5F5] py-4">
              <p className="mb-1 text-sm font-medium uppercase tracking-wide text-[#767676]">
                Telefon Zaufania dla Dzieci i Młodzieży
              </p>
              <a
                href="tel:116111"
                className="text-2xl font-bold text-black hover:underline"
              >
                116 111
              </a>
            </div>

            {/* Number 2 */}
            <div className="border-b border-[#F5F5F5] py-4">
              <p className="mb-1 text-sm font-medium uppercase tracking-wide text-[#767676]">
                Telefon Zaufania dla Dorosłych
              </p>
              <a
                href="tel:116123"
                className="text-2xl font-bold text-black hover:underline"
              >
                116 123
              </a>
            </div>

            {/* Number 3 */}
            <div className="border-b border-[#F5F5F5] py-4">
              <p className="mb-1 text-sm font-medium uppercase tracking-wide text-[#767676]">
                Centrum Wsparcia dla osób w kryzysie psychicznym
              </p>
              <a
                href="tel:800702222"
                className="text-2xl font-bold text-black hover:underline"
              >
                800 70 2222
              </a>
            </div>

            {/* Number 4 */}
            <div className="py-4">
              <p className="mb-1 text-sm font-medium uppercase tracking-wide text-[#767676]">
                Telefon Nadziei
              </p>
              <a
                href="tel:116123"
                className="text-2xl font-bold text-black hover:underline"
              >
                116 123
              </a>
            </div>
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
              href="https://cpk.org.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-medium text-[#161616] underline underline-offset-4"
            >
              Fundacja Centrum Praw Kobiet
            </a>
          </div>
        </section>

        {/* International Help */}
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-semibold text-black">
            Pomoc międzynarodowa
          </h2>

          <div className="space-y-3">
            <p className="font-medium text-[#161616]">
              <span>Crisis Text Line — Text HOME to 741741</span>
              <span className="ml-2 text-sm text-[#767676]">(US)</span>
            </p>
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
