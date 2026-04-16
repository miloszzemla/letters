import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O projekcie — Letters.",
  description:
    "Letters. to anonimowa przestrzeń, w której ludzie dzielą się swoimi listami — osobistymi tekstami nadziei, przebaczenia, wdzięczności i siły.",
};

export default function About() {
  return (
    <main className="min-h-screen bg-white">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                step: "01",
                title: "Napisz",
                desc: "Otwierasz formularz i piszesz to, co czujesz. Anonimowo. Bez konta.",
                icon: "✉️",
              },
              {
                step: "02",
                title: "Moderacja",
                desc: "Twój list trafia do kolejki. Sprawdzamy, czy nie zawiera treści, które mogłyby komuś zaszkodzić.",
                icon: "🛡️",
              },
              {
                step: "03",
                title: "Publikacja",
                desc: "Zatwierdzony list pojawia się na stronie. Ktoś go przeczyta. Może to zmieni czyjś dzień.",
                icon: "🌍",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative rounded-xl border border-[#F0F0F0] bg-[#FAFAFA] p-6"
              >
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#BFBFBF] mb-1 block">
                  Krok {item.step}
                </span>
                <h3 className="text-[16px] font-bold text-[#161616] mb-2">
                  {item.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-[#525252]">
                  {item.desc}
                </p>
              </div>
            ))}
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
