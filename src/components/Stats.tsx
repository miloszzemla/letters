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
    <div className="grid grid-cols-3 py-6 px-4 md:px-6 border-t border-b border-[#F5F5F5] mb-20">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`text-center px-2 ${i < stats.length - 1 ? "border-r border-[#E5E5E5]" : ""}`}
        >
          <p className="text-[20px] md:text-[28px] font-bold tracking-tight mb-0.5 text-[#161616]">
            {stat.value}
          </p>
          <p className="text-[11px] md:text-[13px] text-[#636363] font-medium">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
