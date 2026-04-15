export default function BMCSection() {
  return (
    <section className="text-center py-16 border-t border-[#F5F5F5]">
      <p className="text-[15px] text-[#525252] max-w-[420px] mx-auto mb-6">
        Letters. to projekt non-profit. Jeśli chcesz wesprzeć jego istnienie,
        możesz postawić mi kawę.
      </p>
      <a
        href="https://www.buymeacoffee.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 bg-[#FFDD00] text-[#161616] rounded-[10px] px-7 py-3.5 font-semibold transition-all hover:-translate-y-px hover:shadow-md"
      >
        {/* Coffee cup SVG */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M4 8h10l-1.5 7H5.5L4 8Z"
            stroke="#161616"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M14 10h1.5a1.5 1.5 0 0 1 0 3H14"
            stroke="#161616"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M7 5.5c0-1 1-1.5 1-2.5M10 5.5c0-1 1-1.5 1-2.5"
            stroke="#161616"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        Postaw mi kawę
      </a>
    </section>
  );
}
