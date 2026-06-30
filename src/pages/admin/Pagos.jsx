import { Wallet, Clock, CheckCircle2 } from "lucide-react";
import { PageHeader, Card, StatsCard, Badge, Table, Tr, Td } from "../../components/ui";
import { payments } from "../../data/gymData";
import { formatCurrency, formatDate, statusVariant } from "../../utils/format";

export default function Pagos() {
  const total = payments.reduce((s, p) => s + p.monto, 0);
  const pendientes = payments.filter((p) => p.estado === "Pendiente").reduce((s, p) => s + p.monto, 0);
  const pagados = payments.filter((p) => p.estado === "Pagado").reduce((s, p) => s + p.monto, 0);

  return (
    <div>
      <PageHeader title="Pagos" subtitle="Historial y estado de pagos de la membresía" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatsCard label="Total recaudado" value={formatCurrency(total)} icon={Wallet} />
        <StatsCard label="Pendientes" value={formatCurrency(pendientes)} icon={Clock} trendUp={false} />
        <StatsCard label="Pagados" value={formatCurrency(pagados)} icon={CheckCircle2} trend="92% del total" />
      </div>

      <Card padded={false}>
        <Table columns={["Cliente", "Fecha", "Monto", "Medio de pago", "Estado"]}>
          {payments.map((p) => (
            <Tr key={p.id}>
              <Td className="font-medium text-ink whitespace-nowrap">{p.cliente}</Td>
              <Td className="text-ink-muted font-mono text-xs">{formatDate(p.fecha)}</Td>
              <Td className="font-mono text-ink">{formatCurrency(p.monto)}</Td>
              <Td className="text-ink-muted">{p.medio}</Td>
              <Td><Badge variant={statusVariant(p.estado)}>{p.estado}</Badge></Td>
            </Tr>
          ))}
        </Table>
        <div className="h-5" />
      </Card>
    </div>
  );
}
