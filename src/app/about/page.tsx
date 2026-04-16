import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "O projekcie — Letters.",
  description:
    "Letters. to anonimowa przestrzeń, w której ludzie dzielą się swoimi listami — osobistymi tekstami nadziei, przebaczenia, wdzięczności i siły.",
};

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="mx-auto max-w-[640px] px-6 py-24">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-black">
          O projekcie
        </h1>

        {/* Section 1 - Mission */}
        <div className="space-y-4 text-base leading-relaxed text-[#525252]">
          <p>
            Letters. to anonimowa przestrzeń, w której ludzie dzielą się
            swoimi listami — osobistymi tekstami nadziei, przebaczenia,
            wdzięczności i siły.
          </p>
          <p>
            Wierzymy, że słowa mają moc. Że jeden list, napisany o trzeciej w
            nocy przez kogoś, kto przetrwał, może zmienić czyjś dzień. Albo
            życie.
          </p>
          <p>
            To nie jest platforma terapeutyczna. To miejsce, gdzie ludzie mówią
            do ludzi. Bez kont, bez lajków, bez algorytmów. Tylko Ty i Twoje
            słowa.
          </p>
        </div>

        {/* Section 2 - How it works */}
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-black">
            Jak to działa
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div
              aria-hidden="true"
              className="absolute left-[15px] top-2 bottom-2 w-px bg-[#E5E5E5]"
            />

            <div className="space-y-10">
              {[
                {
                  title: "Napisz",
                  desc: "Otwierasz formularz i piszesz to, co czujesz. Anonimowo. Bez konta.",
                },
                {
                  title: "Moderacja",
                  desc: "Twój list trafia do kolejki. Sprawdzamy, czy nie zawiera treści, które mogłyby komuś zaszkodzić.",
                },
                {
                  title: "Publikacja",
                  desc: "Zatwierdzony list pojawia się na stronie. Ktoś go przeczyta. Może to zmieni czyjś dzień.",
                },
              ].map((item, i) => (
                <div key={item.title} className="flex gap-6 items-start">
                  <div className="relative z-10 w-[31px] h-[31px] rounded-full bg-white border border-[#E5E5E5] flex items-center justify-center flex-shrink-0">
                    <span className="text-[13px] font-semibold text-[#161616]">
                      {i + 1}
                    </span>
                  </div>
                  <div className="pt-0.5">
                    <h3 className="text-[16px] font-semibold text-[#161616] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-[#525252]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3 - Who's behind it */}
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-black">
            Kto za tym stoi
          </h2>
          <p className="text-base leading-relaxed text-[#525252]">
            Letters. to projekt stworzony przez jedną osobę, która wierzy, że
            technologia może służyć ludziom. Projekt jest open source i
            non-profit.
          </p>
        </section>
      </div>
    </main>
  );
}
