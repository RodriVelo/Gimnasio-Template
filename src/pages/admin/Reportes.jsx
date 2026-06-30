import { ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { PageHeader, Card } from "../../components/ui";
import { revenueChart, clientsPerMonth, attendanceChart, newSignupsChart } from "../../data/gymData";
import { chartColors, ChartTooltip } from "../../components/charts/ChartTheme";

export default function Reportes() {
  return (
    <div>
      <PageHeader title="Reportes" subtitle="Métricas clave del negocio en los últimos 6 meses" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-sm font-semibold text-ink mb-1">Clientes por mes</h3>
          <p className="text-xs text-ink-faint mb-4">Crecimiento neto de la base de clientes</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={clientsPerMonth} margin={{ left: -16, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
              <XAxis dataKey="mes" stroke={chartColors.axis} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={chartColors.axis} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="clientes" stroke={chartColors.accent} strokeWidth={2.5} dot={{ r: 3, fill: chartColors.accent }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-ink mb-1">Ingresos</h3>
          <p className="text-xs text-ink-faint mb-4">Evolución de la facturación mensual</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueChart} margin={{ left: -16, right: 8 }}>
              <defs>
                <linearGradient id="repRevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColors.accent} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={chartColors.accent} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
              <XAxis dataKey="mes" stroke={chartColors.axis} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={chartColors.axis} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip content={<ChartTooltip prefix="$" />} />
              <Area type="monotone" dataKey="ingresos" stroke={chartColors.accent} strokeWidth={2} fill="url(#repRevGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-ink mb-1">Asistencias</h3>
          <p className="text-xs text-ink-faint mb-4">Concurrencia por día de la semana</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={attendanceChart} margin={{ left: -16, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
              <XAxis dataKey="dia" stroke={chartColors.axis} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={chartColors.axis} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(249,115,22,0.07)" }} />
              <Bar dataKey="asistencias" fill={chartColors.accent} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-ink mb-1">Nuevas altas</h3>
          <p className="text-xs text-ink-faint mb-4">Clientes nuevos registrados por mes</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={newSignupsChart} margin={{ left: -16, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
              <XAxis dataKey="mes" stroke={chartColors.axis} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={chartColors.axis} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(249,115,22,0.07)" }} />
              <Bar dataKey="altas" fill={chartColors.accentSoft} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
