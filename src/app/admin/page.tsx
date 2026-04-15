"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Letter } from "@/lib/types";

const ADMIN_PASSWORD = "letters2026";
const SENSITIVE_KEYWORDS = [
  "nie dam rady",
  "koniec",
  "nie chcę żyć",
  "nie chce zyc",
];

function isSensitive(body: string): boolean {
  const lower = body.toLowerCase();
  return SENSITIVE_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

function formatTime(createdAt: string): string {
  try {
    const date = new Date(Number(createdAt));
    if (isNaN(date.getTime())) return createdAt;
    const now = new Date();
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
    const hh = date.getHours().toString().padStart(2, "0");
    const mm = date.getMinutes().toString().padStart(2, "0");
    if (isToday) return `Dziś, ${hh}:${mm}`;
    return `${date.getDate()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}, ${hh}:${mm}`;
  } catch {
    return createdAt;
  }
}

// ─── Password Gate ────────────────────────────────────────────────────────────

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin-authenticated", "true");
      onAuth();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-6">
      <div className="w-full max-w-[340px]">
        <p className="text-[13px] font-semibold text-[#767676] uppercase tracking-widest mb-6 text-center">
          Letters. Admin
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Hasło administratora"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            autoFocus
            className="w-full border border-[#E5E5E5] rounded-xl px-4 py-3 text-[15px] text-[#161616] bg-white placeholder:text-[#ACACAC] focus:outline-none focus:border-[#161616] transition-colors"
          />
          {error && (
            <p className="text-[13px] text-[#DC2626] font-medium">
              Nieprawidłowe hasło
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-[#161616] text-white rounded-xl py-3 text-[15px] font-semibold hover:opacity-85 transition-opacity"
          >
            Zaloguj
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Letter["status"] }) {
  const configs = {
    pending: {
      cls: "bg-[#FFFBEB] text-[#B45309]",
      dotCls: "bg-[#F59E0B]",
      label: "Oczekujące",
    },
    published: {
      cls: "bg-[#F0FDF4] text-[#15803D]",
      dotCls: "bg-[#22C55E]",
      label: "Zatwierdzone",
    },
    rejected: {
      cls: "bg-[#FEF2F2] text-[#B91C1C]",
      dotCls: "bg-[#EF4444]",
      label: "Odrzucone",
    },
  };
  const { cls, dotCls, label } = configs[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cls}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotCls}`} />
      {label}
    </span>
  );
}

// ─── Tab Badge ────────────────────────────────────────────────────────────────

function TabBadge({
  count,
  type,
}: {
  count: number;
  type: "pending" | "published" | "rejected";
}) {
  const cls = {
    pending: "bg-[#FFFBEB] text-[#B45309]",
    published: "bg-[#F0FDF4] text-[#15803D]",
    rejected: "bg-[#FEF2F2] text-[#B91C1C]",
  }[type];
  return (
    <span
      className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[11px] font-bold ml-1.5 ${cls}`}
    >
      {count}
    </span>
  );
}

// ─── Letter Card ──────────────────────────────────────────────────────────────

interface LetterCardProps {
  letter: Letter;
  index: number;
  focused: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onSaveEdit: (id: string, updated: Partial<Letter>) => void;
}

function LetterCard({
  letter,
  index,
  focused,
  onApprove,
  onReject,
  onSaveEdit,
}: LetterCardProps) {
  const [editing, setEditing] = useState(false);
  const [editGreeting, setEditGreeting] = useState(letter.greeting);
  const [editBody, setEditBody] = useState(letter.body);
  const [editAuthor, setEditAuthor] = useState(letter.author);
  const sensitive = isSensitive(letter.body);

  const saveEdit = () => {
    onSaveEdit(letter.id, {
      greeting: editGreeting,
      body: editBody,
      author: editAuthor,
    });
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditGreeting(letter.greeting);
    setEditBody(letter.body);
    setEditAuthor(letter.author);
    setEditing(false);
  };

  return (
    <div
      className={`bg-white border rounded-xl overflow-hidden mb-4 transition-all ${
        sensitive ? "border-amber-400" : "border-[#E5E5E5]"
      } ${focused ? "ring-2 ring-[#161616]" : ""}`}
      data-index={index}
    >
      {/* Header row */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-[#F5F5F5]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#767676]">
            #{String(index + 1).padStart(3, "0")}
          </span>
          <span className="text-xs text-[#767676]">
            {formatTime(letter.createdAt || letter.id)}
          </span>
          {sensitive && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFFBEB] text-[#B45309] text-[11px] font-semibold">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 1L9 8.5H1L5 1Z"
                  stroke="#B45309"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 4V6"
                  stroke="#B45309"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <circle cx="5" cy="7.5" r="0.5" fill="#B45309" />
              </svg>
              Wymaga uwagi
            </span>
          )}
        </div>
        <StatusBadge status={letter.status} />
      </div>

      {/* Letter preview or edit mode */}
      {editing ? (
        <div className="mx-6 my-4 flex flex-col gap-3">
          <input
            value={editGreeting}
            onChange={(e) => setEditGreeting(e.target.value)}
            placeholder="Nagłówek"
            className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2 text-[13px] text-[#767676] focus:outline-none focus:border-[#161616]"
          />
          <textarea
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            rows={6}
            className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2 text-[14px] leading-relaxed text-[#525252] resize-y focus:outline-none focus:border-[#161616]"
          />
          <input
            value={editAuthor}
            onChange={(e) => setEditAuthor(e.target.value)}
            placeholder="Podpis"
            className="w-[200px] border border-[#E5E5E5] rounded-lg px-4 py-2 text-[13px] font-semibold italic text-[#161616] focus:outline-none focus:border-[#161616]"
          />
          <div className="flex gap-2 mt-1">
            <button
              onClick={saveEdit}
              className="bg-[#161616] text-white rounded-lg px-5 py-2 text-[13px] font-semibold"
            >
              Zapisz
            </button>
            <button
              onClick={cancelEdit}
              className="border border-[#E5E5E5] text-[#525252] rounded-lg px-5 py-2 text-[13px] font-medium hover:bg-[#F5F5F5]"
            >
              Anuluj
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-6 my-4 p-6 bg-[#FDFCFA] rounded-sm relative overflow-hidden">
          {/* Paper lines */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.3,
              background:
                "repeating-linear-gradient(transparent 0px, transparent 31px, #E8E4DE 31px, #E8E4DE 32px)",
            }}
          />
          {/* Left margin line */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 w-px pointer-events-none"
            style={{ left: "20px", backgroundColor: "#E0C9B5", opacity: 0.3 }}
          />
          {/* Content */}
          <div className="relative z-10">
            {letter.greeting && (
              <p className="text-[13px] text-[#767676] mb-2">
                {letter.greeting}
              </p>
            )}
            <p className="text-[14px] leading-relaxed text-[#525252]">
              {letter.body}
            </p>
            {letter.author && (
              <p className="text-[13px] font-semibold italic text-[#161616] mt-3">
                {letter.author}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Actions row */}
      {!editing && (
        <div className="flex justify-between items-center px-6 py-4 border-t border-[#F5F5F5]">
          <div className="flex gap-2">
            {/* Approve */}
            <button
              onClick={() => onApprove(letter.id)}
              disabled={letter.status === "published"}
              className="inline-flex items-center gap-1.5 bg-[#161616] text-white rounded-lg px-5 py-2 text-[13px] font-semibold disabled:opacity-40 hover:opacity-85 transition-opacity"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2.5 7.5L5.5 10.5L11.5 4"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Zatwierdź
            </button>
            {/* Reject */}
            <button
              onClick={() => onReject(letter.id)}
              disabled={letter.status === "rejected"}
              className="inline-flex items-center gap-1.5 bg-transparent text-[#B91C1C] border-[1.5px] border-[#E5E5E5] rounded-lg px-5 py-2 text-[13px] font-semibold disabled:opacity-40 hover:border-[#EF4444] hover:bg-[#FEF2F2] transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 3L11 11M11 3L3 11"
                  stroke="#B91C1C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Odrzuć
            </button>
            {/* Edit */}
            <button
              onClick={() => setEditing(true)}
              className="inline-flex items-center gap-1.5 bg-transparent text-[#525252] border-[1.5px] border-[#E5E5E5] rounded-lg px-5 py-2 text-[13px] font-medium hover:bg-[#F5F5F5] transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9.5 2.5L11.5 4.5L5 11H3V9L9.5 2.5Z"
                  stroke="#525252"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
              </svg>
              Edytuj
            </button>
          </div>
          <span className="text-xs text-[#767676]">
            {letter.body.length} znaków
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Admin Panel ──────────────────────────────────────────────────────────────

function AdminPanel() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [activeTab, setActiveTab] = useState<
    "pending" | "published" | "rejected"
  >("pending");
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Load letters from localStorage
  const loadLetters = useCallback(() => {
    try {
      const raw = localStorage.getItem("letters-pending") || "[]";
      const parsed = JSON.parse(raw) as Letter[];
      setLetters(parsed);
    } catch {
      setLetters([]);
    }
  }, []);

  useEffect(() => {
    loadLetters();
  }, [loadLetters]);

  // Persist letters to localStorage
  const persist = (updated: Letter[]) => {
    try {
      localStorage.setItem("letters-pending", JSON.stringify(updated));
    } catch {
      // ignore
    }
    setLetters(updated);
  };

  const handleApprove = (id: string) => {
    persist(
      letters.map((l) => (l.id === id ? { ...l, status: "published" } : l))
    );
  };

  const handleReject = (id: string) => {
    persist(
      letters.map((l) => (l.id === id ? { ...l, status: "rejected" } : l))
    );
  };

  const handleSaveEdit = (id: string, updated: Partial<Letter>) => {
    persist(letters.map((l) => (l.id === id ? { ...l, ...updated } : l)));
  };

  // Filtered lists
  const pending = letters.filter((l) => l.status === "pending");
  const published = letters.filter((l) => l.status === "published");
  const rejected = letters.filter((l) => l.status === "rejected");

  const tabMap = {
    pending,
    published,
    rejected,
  };
  const visibleLetters = tabMap[activeTab];

  // Today counts
  const todayStr = new Date().toDateString();
  const approvedToday = published.filter((l) => {
    try {
      return new Date(Number(l.createdAt || l.id)).toDateString() === todayStr;
    } catch {
      return false;
    }
  }).length;
  const rejectedToday = rejected.filter((l) => {
    try {
      return new Date(Number(l.createdAt || l.id)).toDateString() === todayStr;
    } catch {
      return false;
    }
  }).length;
  const publishedTotal = 247 + published.length;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Don't trigger when typing in an input/textarea
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      const list = visibleLetters;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((i) => Math.min(i + 1, list.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "a" || e.key === "A") {
        if (list[focusedIndex]) handleApprove(list[focusedIndex].id);
      } else if (e.key === "r" || e.key === "R") {
        if (list[focusedIndex]) handleReject(list[focusedIndex].id);
      }
      // 'E' for edit is not trivially handled via keyboard without ref, skip for now
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleLetters, focusedIndex]);

  // Reset focus when tab changes
  useEffect(() => {
    setFocusedIndex(0);
  }, [activeTab]);

  const tabs: { key: "pending" | "published" | "rejected"; label: string }[] =
    [
      { key: "pending", label: "Oczekujące" },
      { key: "published", label: "Zatwierdzone" },
      { key: "rejected", label: "Odrzucone" },
    ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Navbar */}
      <nav className="bg-[#161616] text-white px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[16px]">Letters.</span>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 bg-white/15 rounded-full uppercase tracking-wide">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="text-white/60 hover:text-white text-[13px] transition-colors"
          >
            Strona główna
          </Link>
          <div className="w-8 h-8 rounded-full bg-[#525252] flex items-center justify-center text-[13px] font-semibold select-none">
            MZ
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-[960px] mx-auto py-8 px-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Oczekujące", value: pending.length },
            { label: "Zatwierdzone dziś", value: approvedToday },
            { label: "Odrzucone dziś", value: rejectedToday },
            { label: "Opublikowane łącznie", value: publishedTotal },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-white rounded-xl p-5 border border-[#E5E5E5]"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[#767676] mb-2">
                {label}
              </p>
              <p className="text-[28px] font-bold tracking-tight text-[#161616]">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Keyboard shortcut hint */}
        <div className="flex items-center gap-4 mb-4 text-[12px] text-[#767676]">
          <span>
            Skróty klawiszowe:{" "}
            <kbd className="px-1.5 py-0.5 bg-[#F5F5F5] border border-[#E5E5E5] rounded text-[11px] font-mono">
              A
            </kbd>{" "}
            zatwierdź{" "}
            <kbd className="px-1.5 py-0.5 bg-[#F5F5F5] border border-[#E5E5E5] rounded text-[11px] font-mono">
              R
            </kbd>{" "}
            odrzuć{" "}
            <kbd className="px-1.5 py-0.5 bg-[#F5F5F5] border border-[#E5E5E5] rounded text-[11px] font-mono">
              ↑
            </kbd>
            <kbd className="px-1.5 py-0.5 bg-[#F5F5F5] border border-[#E5E5E5] rounded text-[11px] font-mono">
              ↓
            </kbd>{" "}
            nawigacja
          </span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-[#E5E5E5]">
          {tabs.map(({ key, label }) => {
            const count = tabMap[key].length;
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-5 py-2.5 text-[13px] font-semibold border-b-2 transition-colors ${
                  isActive
                    ? "text-[#161616] border-[#161616]"
                    : "text-[#767676] border-transparent hover:text-[#525252]"
                }`}
                style={{ marginBottom: "-1px" }}
              >
                {label}
                <TabBadge count={count} type={key} />
              </button>
            );
          })}
        </div>

        {/* Letter queue */}
        {visibleLetters.length === 0 ? (
          <div className="text-center py-20 text-[#767676]">
            Brak listów w tej kategorii.
          </div>
        ) : (
          visibleLetters.map((letter, i) => (
            <LetterCard
              key={letter.id}
              letter={letter}
              index={i}
              focused={focusedIndex === i}
              onApprove={handleApprove}
              onReject={handleReject}
              onSaveEdit={handleSaveEdit}
            />
          ))
        )}
      </main>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    document.title = "Moderacja — Letters.";
    const ok = sessionStorage.getItem("admin-authenticated") === "true";
    setAuthenticated(ok);
  }, []);

  // Avoid hydration mismatch — render nothing until we've checked sessionStorage
  if (authenticated === null) return null;

  if (!authenticated) {
    return <PasswordGate onAuth={() => setAuthenticated(true)} />;
  }

  return <AdminPanel />;
}
