import { PageHeader, Card, Badge, Table, Tr, Td } from "../../components/ui";
import { myPayments } from "../../data/clientData";
import { formatCurrency, formatDate, statusVariant } from "../../utils/format";

export default function ClientPagos() {
  return (
    <div>
      <PageHeader title="Pagos" subtitle="Historial de pagos de tu membresía" />

      <Card padded={false}>
        <Table columns={["Fecha", "Monto", "Medio de pago", "Estado"]}>
          {myPayments.map((p) => (
            <Tr key={p.id}>
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
