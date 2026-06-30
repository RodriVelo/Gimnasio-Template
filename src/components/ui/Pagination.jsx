import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page = 1, totalPages = 1, onChange = () => {} }) {
  return (
    <div className="flex items-center justify-between px-5 md:px-6 pt-4">
      <p className="text-xs text-ink-faint">
        Página <span className="text-ink-muted font-semibold">{page}</span> de{" "}
        <span className="text-ink-muted font-semibold">{totalPages}</span>
      </p>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-ink-muted hover:text-ink hover:border-border-light disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={15} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
              p === page ? "bg-accent-600 text-white" : "text-ink-muted hover:bg-surface-100 hover:text-ink"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-ink-muted hover:text-ink hover:border-border-light disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
