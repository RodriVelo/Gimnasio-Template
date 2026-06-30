import { useState } from "react";
import { Send } from "lucide-react";
import { PageHeader, Card, Badge } from "../../components/ui";
import { conversations, chatMessages } from "../../data/trainerData";

export default function Mensajes() {
  const [active, setActive] = useState(conversations[0]);
  const [draft, setDraft] = useState("");

  return (
    <div>
      <PageHeader title="Mensajes" subtitle="Conversaciones con tus alumnos" />

      <Card padded={false} className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] h-[560px]">
          {/* Conversations list */}
          <div className="border-r border-border overflow-y-auto">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 border-b border-border text-left transition-colors ${
                  active.id === c.id ? "bg-surface-100" : "hover:bg-surface-50"
                }`}
              >
                <img src={c.foto} alt={c.nombre} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-ink truncate">{c.nombre}</p>
                    <span className="text-[10px] text-ink-faint flex-shrink-0">{c.hora}</span>
                  </div>
                  <p className="text-xs text-ink-faint truncate mt-0.5">{c.ultimo}</p>
                </div>
                {c.noLeidos > 0 && (
                  <span className="w-5 h-5 rounded-full bg-accent-600 text-white text-[10px] font-semibold flex items-center justify-center flex-shrink-0">
                    {c.noLeidos}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Chat window */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border">
              <img src={active.foto} alt={active.nombre} className="w-9 h-9 rounded-full object-cover" />
              <div>
                <p className="text-sm font-medium text-ink">{active.nombre}</p>
                <Badge variant="success" className="mt-0.5">En línea</Badge>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {chatMessages.map((m) => (
                <div key={m.id} className={`flex ${m.autor === "yo" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                      m.autor === "yo" ? "bg-accent-600 text-white rounded-br-sm" : "bg-surface-100 text-ink rounded-bl-sm"
                    }`}
                  >
                    <p>{m.texto}</p>
                    <p className={`text-[10px] mt-1 ${m.autor === "yo" ? "text-white/70" : "text-ink-faint"}`}>{m.hora}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 p-4 border-t border-border">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Escribí un mensaje..."
                className="input-field flex-1"
              />
              <button className="btn-primary !px-3.5">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
