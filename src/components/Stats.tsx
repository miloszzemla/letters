function pluralizeKraje(n: number): string {
  if (n === 1) return "Kraj";
  const lastTwo = n % 100;
  const lastOne = n % 10;
  if (lastTwo >= 12 && lastTwo <= 14) return "Krajów";
  if (lastOne >= 2 && lastOne <= 4) return "Kraje";
  return "Krajów";
}

interface StatsProps {
  letterCount: number;
}

export default function Stats({ letterCount }: StatsProps) {
  const stats = [
    { value: letterCount.toLocaleString("pl-PL"), label: "Opublikowanych listów" },
    { value: "12 841", label: "Przeczytanych" },
    { value: "34", label: pluralizeKraje(34) },
  ];

  return (
    <div className="flex flex-row justify-center gap-6 md:gap-16 py-8 px-4 md:px-6 border-t border-b border-[#F5F5F5] mb-20">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center min-w-0">
          <p className="text-[22px] md:text-[28px] font-bold tracking-tight mb-1 text-[#161616]">
            {stat.value}
          </p>
          <p className="text-[11px] md:text-[13px] text-[#767676] font-medium uppercase tracking-widest">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
