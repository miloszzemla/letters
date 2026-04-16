export default function Footer() {
  return (
    <footer>
      {/* Helpline bar */}
      <div
        className="flex items-center justify-center gap-3 py-4 px-6 border-t border-[#F5F5F5]"
        style={{ backgroundColor: "#FAFAFA", fontSize: "14px", color: "#525252" }}
      >
        <span className="font-semibold text-[#161616]">Potrzebujesz pomocy?</span>
        <span
          aria-hidden="true"
          className="w-1 h-1 rounded-full bg-[#D4D4D4] inline-block flex-shrink-0"
        />
        <span>Telefon Zaufania: 116 123</span>
        <span
          aria-hidden="true"
          className="w-1 h-1 rounded-full bg-[#D4D4D4] inline-block flex-shrink-0"
        />
        <span>Centrum Wsparcia: 800 70 2222</span>
      </div>

      {/* Footer bottom */}
      <div className="py-8 px-12 border-t border-[#F5F5F5] flex justify-between items-center text-[13px] text-[#767676]">
        <span>© 2026 Letters. Projekt dla ludzi.</span>
        <a
          href="https://buymeacoffee.com/letters.project"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#161616] transition-colors"
        >
          ☕ Buy me a coffee
        </a>
      </div>
    </footer>
  );
}
