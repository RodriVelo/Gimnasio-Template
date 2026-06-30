import { useMemo, useState } from "react";
import { Smartphone, Banknote, CreditCard, Wallet, CheckCircle2, AlertCircle } from "lucide-react";
import { PageHeader, Card, StatsCard, SearchBar, Badge, Button, Table, Tr, Td, Modal } from "../../components/ui";
import { membershipStatus as initialStatus } from "../../data/membershipStatus";
import { formatCurrency, formatDate } from "../../utils/format";

const metodoIcon = { "Mercado Pago": Smartphone, "Efectivo": Banknote, "Tarjeta": CreditCard };
const metodoVariant = { "Mercado Pago": "info", "Efectivo": "neutral", "Tarjeta": "neutral" };

const filtros = ["Todos", "Pagado", "Pendiente"];

export default function EstadoMembresias() {
  const [rows, setRows] = useState(initialStatus);
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [target, setTarget] = useState(null);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchSearch = r.nombre.toLowerCase().includes(search.toLowerCase());
      const matchFiltro = filtro === "Todos" || r.estadoPago === filtro;
      return matchSearch && matchFiltro;
    });
  }, [rows, search, filtro]);

  const totalRecaudado = rows.filter((r) => r.estadoPago === "Pagado").reduce((s, r) => s + r.monto, 0);
  const totalPendiente = rows.filter((r) => r.estadoPago === "Pendiente").reduce((s, r) => s + r.monto, 0);
  const pagadasMP = rows.filter((r) => r.metodoPago === "Mercado Pago").length;

  function marcarPagadoEfectivo() {
    setRows((prev) =>
      prev.map((r) => (r.clienteId === target.clienteId ? { ...r, estadoPago: "Pagado", metodoPago: "Efectivo" } : r))
    );
    setTarget(null);
  }

  return (
    <div>
      <PageHeader
        title="Estado de membresías"
        subtitle="Estado de pago de la cuota vigente de cada socio"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatsCard label="Recaudado este período" value={formatCurrency(totalRecaudado)} icon={Wallet} />
        <StatsCard label="Pendiente de cobro" value={formatCurrency(totalPendiente)} icon={AlertCircle} trendUp={false} />
        <StatsCard label="Pagadas con Mercado Pago" value={pagadasMP} icon={Smartphone} />
      </div>

      <Card padded={false}>
        <div className="flex flex-col sm:flex-row gap-3 p-5 md:p-6 pb-4">
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar socio..." className="sm:w-72" />
          <div className="flex items-center gap-2">
            {filtros.map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  filtro === f
                    ? "bg-accent-600/12 text-accent-400 border-accent-600/25"
                    : "text-ink-muted border-border hover:text-ink hover:border-border-light"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <Table columns={["Socio", "Membresía", "Vencimiento", "Monto", "Método de pago", "Estado", ""]}>
          {filtered.map((r) => {
            const Icon = r.metodoPago ? metodoIcon[r.metodoPago] : null;
            return (
              <Tr key={r.clienteId}>
                <Td>
                  <div className="flex items-center gap-3">
                    <img src={r.foto} alt={r.nombre} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                    <span className="font-medium text-ink whitespace-nowrap">{r.nombre}</span>
                  </div>
                </Td>
                <Td className="text-ink-muted whitespace-nowrap">{r.membresia}</Td>
                <Td className="text-ink-muted font-mono text-xs">{formatDate(r.vencimiento)}</Td>
                <Td className="font-mono text-ink">{formatCurrency(r.monto)}</Td>
                <Td>
                  {r.metodoPago ? (
                    <Badge variant={metodoVariant[r.metodoPago]} dot={false}>
                      {Icon && <Icon size={11} />} {r.metodoPago}
                    </Badge>
                  ) : (
                    <span className="text-xs text-ink-faint">—</span>
                  )}
                </Td>
                <Td>
                  <Badge variant={r.estadoPago === "Pagado" ? "success" : "warning"}>
                    {r.estadoPago === "Pagado" ? <CheckCircle2 size={11} /> : <AlertCircle size={11} />}
                    {r.estadoPago}
                  </Badge>
                </Td>
                <Td>
                  {r.estadoPago === "Pendiente" && (
                    <Button variant="secondary" className="!py-1.5 !px-3 !text-xs" onClick={() => setTarget(r)}>
                      Marcar como pagado
                    </Button>
                  )}
                </Td>
              </Tr>
            );
          })}
        </Table>

        {filtered.length === 0 && (
          <p className="text-center text-sm text-ink-faint py-10">No se encontraron socios con esos filtros.</p>
        )}
        <div className="h-5" />
      </Card>

      <Modal
        open={!!target}
        onClose={() => setTarget(null)}
        title="Registrar pago en efectivo"
        footer={<>
          <Button variant="secondary" onClick={() => setTarget(null)}>Cancelar</Button>
          <Button onClick={marcarPagadoEfectivo}>Confirmar pago</Button>
        </>}
      >
        {target && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={target.foto} alt={target.nombre} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="text-sm font-medium text-ink">{target.nombre}</p>
                <p className="text-xs text-ink-faint">{target.membresia} · {formatCurrency(target.monto)}</p>
              </div>
            </div>
            <p className="text-sm text-ink-muted">
              Esto va a marcar la cuota como <span className="text-ink font-medium">Pagada</span> con método{" "}
              <span className="text-ink font-medium">Efectivo</span>, registrado manualmente desde el panel de administrador.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
