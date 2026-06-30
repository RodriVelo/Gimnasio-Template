export function formatCurrency(value) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value);
}

export function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
}

export const statusVariant = (estado) => {
  const map = {
    Activo: "success",
    Pagado: "success",
    Confirmada: "success",
    Vencido: "danger",
    Pendiente: "warning",
    Inactivo: "neutral",
  };
  return map[estado] || "neutral";
};
