import { Users, UserCheck, ShieldAlert, AlertCircle, Clock, QrCode, Hand } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { PageHeader, Card, StatsCard, Badge, Button } from "../../components/ui";
import { clients } from "../../data/clients";
import { membershipStatus } from "../../data/membershipStatus";
import { todayAttendance } from "../../data/attendanceLog";
import { formatDate, membershipStatusLabel } from "../../utils/format";

export default function RecepcionistaHome() {
  const navigate = useNavigate();
  const clientesActivos = clients.filter((c) => c.estado === "Activo").length;
  const presentesHoy = todayAttendance.length;
  const proximasAVencer = membershipStatus.filter((m) => membershipStatusLabel(m.vencimiento) === "Próxima a vencer").length;
  const pagosPendientes = membershipStatus.filter((m) => m.estadoPago === "Pendiente").length;

  const ultimasAsistencias = [...todayAttendance].slice(0, 6);

  return (
    <div>
      <PageHeader
        title="Recepción"
        subtitle="Resumen operativo de FORJA Gym — hoy"
        actions={<Button icon={UserCheck} onClick={() => navigate("/recepcionista/asistencia")}>Registrar asistencia</Button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard label="Clientes activos" value={clientesActivos} icon={Users} />
        <StatsCard label="Presentes hoy" value={presentesHoy} icon={UserCheck} />
        <StatsCard label="Próximas a vencer" value={proximasAVencer} icon={ShieldAlert} trendUp={false} />
        <StatsCard label="Pagos pendientes" value={pagosPendientes} icon={AlertCircle} trendUp={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card padded={false} className="lg:col-span-2">
          <div className="flex items-center justify-between px-5 md:px-6 pt-5 pb-1">
            <h3 className="text-sm font-semibold text-ink">Últimas asistencias registradas</h3>
            <Link to="/recepcionista/asistencia" className="text-xs text-accent-400 hover:text-accent-300 font-medium">Ver todas</Link>
          </div>
          <div className="divide-y divide-border mt-3">
            {ultimasAsistencias.map((a) => (
              <div key={a.id} className="flex items-center justify-between px-5 md:px-6 py-3">
                <div className="flex items-center gap-3">
                  <img src={a.foto} alt={a.nombre} className="w-8 h-8 rounded-full object-cover" />
                  <p className="text-sm text-ink font-medium">{a.nombre}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-ink-faint font-mono flex items-center gap-1">
                    <Clock size={12} /> {a.hora}
                  </span>
                  <Badge variant={a.metodo === "QR" ? "info" : "neutral"} dot={false}>
                    {a.metodo === "QR" ? <QrCode size={11} /> : <Hand size={11} />}
                    {a.metodo}
                  </Badge>
                </div>
              </div>
            ))}
            {ultimasAsistencias.length === 0 && (
              <p className="text-center text-sm text-ink-faint py-8">Todavía no hay asistencias registradas hoy.</p>
            )}
          </div>
          <div className="h-4" />
        </Card>

        <Card padded={false}>
          <div className="px-5 md:px-6 pt-5 pb-1 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-ink">Membresías próximas a vencer</h3>
            <Link to="/recepcionista/membresias" className="text-xs text-accent-400 hover:text-accent-300 font-medium">Ver todas</Link>
          </div>
          <div className="divide-y divide-border mt-3">
            {membershipStatus
              .filter((m) => membershipStatusLabel(m.vencimiento) !== "Vigente")
              .slice(0, 6)
              .map((m) => (
                <div key={m.clienteId} className="flex items-center justify-between px-5 md:px-6 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={m.foto} alt={m.nombre} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-ink font-medium truncate">{m.nombre}</p>
                      <p className="text-xs text-ink-faint">{m.membresia}</p>
                    </div>
                  </div>
                  <p className="text-xs font-mono text-ink-muted flex-shrink-0">{formatDate(m.vencimiento)}</p>
                </div>
              ))}
          </div>
          <div className="h-4" />
        </Card>
      </div>
    </div>
  );
}
