export default function Footer() {
  return (
    <footer>
      {/* Helpline bar */}
      <div
        className="flex flex-col items-center gap-1 py-4 px-6 border-t border-[#F5F5F5] text-center"
        style={{ backgroundColor: "#FAFAFA", fontSize: "14px", color: "#636363" }}
      >
        <span className="font-semibold text-[#161616]">Potrzebujesz pomocy?</span>
        <span>Telefon&nbsp;Zaufania:&nbsp;116&nbsp;123 &middot; Centrum&nbsp;Wsparcia:&nbsp;800&nbsp;70&nbsp;2222</span>
      </div>

      {/* Footer bottom */}
      <div className="py-6 px-6 border-t border-[#F5F5F5] flex flex-col sm:flex-row justify-between items-center gap-1 text-[13px] text-[#636363]">
        <span>© 2026 Letters. Projekt dla ludzi.</span>
        <span>Zbudowane z troską.</span>
      </div>
    </footer>
  );
}
