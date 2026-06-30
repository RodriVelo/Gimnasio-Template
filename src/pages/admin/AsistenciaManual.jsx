import { useState } from "react";
import { QrCode, UserCheck, Clock, Hand } from "lucide-react";
import { PageHeader, Card, SearchBar, Badge, Button, Modal } from "../../components/ui";
import { clients } from "../../data/clients";
import { todayAttendance } from "../../data/attendanceLog";

function currentTime() {
  return new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
}

export default function AsistenciaManual() {
  const [search, setSearch] = useState("");
  const [log, setLog] = useState(todayAttendance);
  const [target, setTarget] = useState(null);

  const results = search.trim()
    ? clients.filter((c) => c.nombre.toLowerCase().includes(search.toLowerCase())).slice(0, 6)
    : [];

  const alreadyToday = (nombre) => log.some((l) => l.nombre === nombre);

  function confirmCheckIn() {
    setLog((prev) => [
      { id: Date.now(), nombre: target.nombre, foto: target.foto, hora: currentTime(), metodo: "Manual" },
      ...prev,
    ]);
    setTarget(null);
    setSearch("");
  }

  const manualCount = log.filter((l) => l.metodo === "Manual").length;
  const qrCount = log.filter((l) => l.metodo === "QR").length;

  return (
    <div>
      <PageHeader
        title="Registrar asistencia"
        subtitle="Marcá la entrada de un socio cuando no pueda escanear el código QR"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="panel panel-pad">
          <div className="w-10 h-10 rounded-xl bg-accent-600/10 border border-accent-600/20 flex items-center justify-center text-accent-500 mb-3">
            <UserCheck size={18} />
          </div>
          <p className="text-xs text-ink-muted uppercase tracking-wide">Asistencias hoy</p>
          <p className="text-2xl font-semibold text-ink stat-num mt-1.5">{log.length}</p>
        </div>
        <div className="panel panel-pad">
          <div className="w-10 h-10 rounded-xl bg-surface-100 border border-border flex items-center justify-center text-ink-muted mb-3">
            <QrCode size={18} />
          </div>
          <p className="text-xs text-ink-muted uppercase tracking-wide">Por código QR</p>
          <p className="text-2xl font-semibold text-ink stat-num mt-1.5">{qrCount}</p>
        </div>
        <div className="panel panel-pad">
          <div className="w-10 h-10 rounded-xl bg-surface-100 border border-border flex items-center justify-center text-ink-muted mb-3">
            <Hand size={18} />
          </div>
          <p className="text-xs text-ink-muted uppercase tracking-wide">Registro manual</p>
          <p className="text-2xl font-semibold text-ink stat-num mt-1.5">{manualCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-sm font-semibold text-ink mb-1">Buscar socio</h3>
          <p className="text-xs text-ink-faint mb-4">
            Usalo cuando el lector de QR falle o el socio no tenga la app a mano.
          </p>
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nombre..." />

          <div className="mt-4 space-y-2">
            {search.trim() && results.length === 0 && (
              <p className="text-xs text-ink-faint py-4 text-center">No se encontraron socios con ese nombre.</p>
            )}
            {results.map((c) => (
              <div key={c.id} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface-50 border border-border">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={c.foto} alt={c.nombre} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{c.nombre}</p>
                    <p className="text-xs text-ink-faint">{c.membresia}</p>
                  </div>
                </div>
                {alreadyToday(c.nombre) ? (
                  <Badge variant="success">Ya registrado</Badge>
                ) : (
                  <Button variant="secondary" className="!py-1.5 !px-3 !text-xs flex-shrink-0" onClick={() => setTarget(c)}>
                    Registrar
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card padded={false}>
          <div className="px-5 md:px-6 pt-5 pb-3">
            <h3 className="text-sm font-semibold text-ink">Asistencias de hoy</h3>
          </div>
          <div className="divide-y divide-border max-h-[420px] overflow-y-auto">
            {log.map((l) => (
              <div key={l.id} className="flex items-center justify-between px-5 md:px-6 py-3">
                <div className="flex items-center gap-3">
                  <img src={l.foto} alt={l.nombre} className="w-8 h-8 rounded-full object-cover" />
                  <p className="text-sm text-ink font-medium">{l.nombre}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-ink-faint font-mono flex items-center gap-1">
                    <Clock size={12} /> {l.hora}
                  </span>
                  <Badge variant={l.metodo === "QR" ? "info" : "neutral"} dot={false}>
                    {l.metodo === "QR" ? <QrCode size={11} /> : <Hand size={11} />}
                    {l.metodo}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="h-4" />
        </Card>
      </div>

      <Modal
        open={!!target}
        onClose={() => setTarget(null)}
        title="Confirmar asistencia"
        footer={<>
          <Button variant="secondary" onClick={() => setTarget(null)}>Cancelar</Button>
          <Button onClick={confirmCheckIn}>Confirmar entrada</Button>
        </>}
      >
        {target && (
          <div className="flex items-center gap-3">
            <img src={target.foto} alt={target.nombre} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="text-sm font-medium text-ink">{target.nombre}</p>
              <p className="text-xs text-ink-faint">Se va a registrar el ingreso a las {currentTime()} hs como asistencia manual.</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
