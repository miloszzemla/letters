interface StatsProps {
  letterCount: number;
}

export default function Stats({ letterCount }: StatsProps) {
  const stats = [
    { value: letterCount.toLocaleString("pl-PL"), label: "Opublikowanych listów" },
    { value: "12 841", label: "Przeczytanych" },
    { value: "34", label: "Krajów" },
  ];

  return (
    <div className="flex flex-row justify-center gap-8 md:gap-16 py-8 px-6 border-t border-b border-[#F5F5F5] mb-20">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="text-[28px] font-bold tracking-tight mb-1 text-[#161616]">
            {stat.value}
          </p>
          <p className="text-[13px] text-[#767676] font-medium uppercase tracking-widest">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
