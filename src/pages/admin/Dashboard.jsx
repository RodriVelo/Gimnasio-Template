import { Users, AlertTriangle, DollarSign, GraduationCap, CalendarCheck, Plus } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { PageHeader, Card, StatsCard, Badge, Button } from "../../components/ui";
import { revenueChart, payments, recentActivity } from "../../data/gymData";
import { clients } from "../../data/clients";
import { formatCurrency, formatDate, statusVariant } from "../../utils/format";
import { chartColors, ChartTooltip } from "../../components/charts/ChartTheme";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const upcoming = [...clients].sort((a, b) => new Date(a.vencimiento) - new Date(b.vencimiento)).slice(0, 5);
  const lastPayments = [...payments].slice(0, 5);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Resumen general de FORJA Gym — 30 de junio, 2026"
        actions={<Button icon={Plus}>Nuevo cliente</Button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatsCard label="Clientes activos" value="284" icon={Users} trend="+6.2% vs mes anterior" />
        <StatsCard label="Membresías vencidas" value="18" icon={AlertTriangle} trend="-3 vs semana pasada" trendUp={false} />
        <StatsCard label="Ingresos del mes" value="$1.34M" icon={DollarSign} trend="+8.9% vs mes anterior" />
        <StatsCard label="Entrenadores" value="4" icon={GraduationCap} />
        <StatsCard label="Asistencias hoy" value="97" icon={CalendarCheck} trend="+12 vs ayer" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-ink">Ingresos mensuales</h3>
              <p className="text-xs text-ink-faint mt-0.5">Últimos 6 meses</p>
            </div>
            <Badge variant="success">+12.4% este semestre</Badge>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueChart} margin={{ left: -16, right: 8 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColors.accent} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={chartColors.accent} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
              <XAxis dataKey="mes" stroke={chartColors.axis} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={chartColors.axis} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip content={<ChartTooltip prefix="$" />} />
              <Area type="monotone" dataKey="ingresos" stroke={chartColors.accent} strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-ink mb-4">Actividad reciente</h3>
          <div className="space-y-4">
            {recentActivity.map((a) => (
              <div key={a.id} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-600 mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-ink-muted leading-snug">{a.texto}</p>
                  <p className="text-[11px] text-ink-faint mt-0.5">{a.tiempo}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card padded={false}>
          <div className="flex items-center justify-between px-5 md:px-6 pt-5 pb-1">
            <h3 className="text-sm font-semibold text-ink">Últimos pagos</h3>
            <Link to="/admin/pagos" className="text-xs text-accent-400 hover:text-accent-300 font-medium">Ver todos</Link>
          </div>
          <div className="divide-y divide-border mt-3">
            {lastPayments.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-5 md:px-6 py-3">
                <div>
                  <p className="text-sm text-ink font-medium">{p.cliente}</p>
                  <p className="text-xs text-ink-faint">{formatDate(p.fecha)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono text-ink">{formatCurrency(p.monto)}</p>
                  <Badge variant={statusVariant(p.estado)} className="mt-1">{p.estado}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card padded={false}>
          <div className="flex items-center justify-between px-5 md:px-6 pt-5 pb-1">
            <h3 className="text-sm font-semibold text-ink">Próximos vencimientos</h3>
            <Link to="/admin/clientes" className="text-xs text-accent-400 hover:text-accent-300 font-medium">Ver todos</Link>
          </div>
          <div className="divide-y divide-border mt-3">
            {upcoming.map((c) => (
              <div key={c.id} className="flex items-center justify-between px-5 md:px-6 py-3">
                <div className="flex items-center gap-3">
                  <img src={c.foto} alt={c.nombre} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-sm text-ink font-medium">{c.nombre}</p>
                    <p className="text-xs text-ink-faint">{c.membresia}</p>
                  </div>
                </div>
                <p className="text-xs font-mono text-ink-muted">{formatDate(c.vencimiento)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
