"use client";

interface BottomCTAProps {
  onWriteClick: () => void;
}

export default function BottomCTA({ onWriteClick }: BottomCTAProps) {
  return (
    <section className="text-center py-24 bg-[#FAFAFA] border-t border-[#F5F5F5]">
      <h2 className="text-4xl font-bold tracking-tight text-[#161616] mb-4">
        Masz coś do powiedzenia?
      </h2>
      <p className="text-base text-[#525252] max-w-[480px] mx-auto mb-8">
        Twoje słowa mogą zmienić czyjś dzień...
      </p>
      <button
        onClick={onWriteClick}
        className="bg-[#161616] text-white rounded-[10px] px-9 py-3.5 font-semibold text-[15px] transition-opacity hover:opacity-85"
      >
        Napisz list
      </button>
    </section>
  );
}
