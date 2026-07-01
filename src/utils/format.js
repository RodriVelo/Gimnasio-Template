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

// --- Estado de vigencia de una membresía en base a su fecha de vencimiento ---
// No confundir con el estado de pago de la cuota (Pagado/Pendiente).
const PROXIMO_A_VENCER_DIAS = 15;

export function membershipDaysLeft(vencimiento) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const venc = new Date(vencimiento + "T00:00:00");
  return Math.round((venc - today) / 86400000);
}

export function membershipStatusLabel(vencimiento) {
  const days = membershipDaysLeft(vencimiento);
  if (days < 0) return "Vencida";
  if (days <= PROXIMO_A_VENCER_DIAS) return "Próxima a vencer";
  return "Vigente";
}

export function membershipStatusVariant(label) {
  const map = { Vigente: "success", "Próxima a vencer": "warning", Vencida: "danger" };
  return map[label] || "neutral";
}
