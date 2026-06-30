import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { PageHeader, Card } from "../../components/ui";
import { progressData } from "../../data/clientData";
import { chartColors, ChartTooltip } from "../../components/charts/ChartTheme";

export default function Progreso() {
  return (
    <div>
      <PageHeader title="Mi progreso" subtitle="Evolución física de los últimos 6 meses" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card>
          <h3 className="text-sm font-semibold text-ink mb-1">Peso corporal</h3>
          <p className="text-xs text-ink-faint mb-4">En kilogramos</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={progressData.peso} margin={{ left: -16, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
              <XAxis dataKey="mes" stroke={chartColors.axis} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={chartColors.axis} fontSize={12} tickLine={false} axisLine={false} domain={["dataMin - 2", "dataMax + 2"]} />
              <Tooltip content={<ChartTooltip suffix=" kg" />} />
              <Line type="monotone" dataKey="valor" stroke={chartColors.accent} strokeWidth={2.5} dot={{ r: 3, fill: chartColors.accent }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-ink mb-1">Masa muscular</h3>
          <p className="text-xs text-ink-faint mb-4">Porcentaje estimado</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={progressData.masaMuscular} margin={{ left: -16, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
              <XAxis dataKey="mes" stroke={chartColors.axis} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={chartColors.axis} fontSize={12} tickLine={false} axisLine={false} domain={["dataMin - 1", "dataMax + 1"]} />
              <Tooltip content={<ChartTooltip suffix="%" />} />
              <Line type="monotone" dataKey="valor" stroke={chartColors.accentSoft} strokeWidth={2.5} dot={{ r: 3, fill: chartColors.accentSoft }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-ink mb-1">Medidas — cintura</h3>
          <p className="text-xs text-ink-faint mb-4">En centímetros</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={progressData.medidas} margin={{ left: -16, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
              <XAxis dataKey="mes" stroke={chartColors.axis} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={chartColors.axis} fontSize={12} tickLine={false} axisLine={false} domain={["dataMin - 2", "dataMax + 2"]} />
              <Tooltip content={<ChartTooltip suffix=" cm" />} />
              <Line type="monotone" dataKey="cintura" stroke={chartColors.accent} strokeWidth={2.5} dot={{ r: 3, fill: chartColors.accent }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-ink mb-1">Entrenamientos realizados</h3>
          <p className="text-xs text-ink-faint mb-4">Sesiones completadas por mes</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={progressData.entrenamientos} margin={{ left: -16, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
              <XAxis dataKey="mes" stroke={chartColors.axis} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={chartColors.axis} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(249,115,22,0.07)" }} />
              <Bar dataKey="cantidad" fill={chartColors.accent} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <h3 className="text-sm font-semibold text-ink mb-1">Galería de progreso</h3>
        <p className="text-xs text-ink-faint mb-4">Fotos cargadas en los últimos meses</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {progressData.fotos.map((f, i) => (
            <div key={i} className="aspect-square rounded-xl overflow-hidden border border-border">
              <img src={f} alt={`Progreso ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
