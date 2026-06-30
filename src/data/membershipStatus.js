// Estado de pago de la cuota/membresía vigente de cada cliente.
// metodoPago: "Mercado Pago" | "Efectivo" | "Tarjeta" | null (null = todavía no se registró el pago)
// estadoPago: "Pagado" | "Pendiente"
export const membershipStatus = [
  { clienteId: 1, nombre: "Martina Acosta", foto: "https://i.pravatar.cc/150?img=47", membresia: "Anual", vencimiento: "2026-12-04", monto: 158400, metodoPago: "Mercado Pago", estadoPago: "Pagado" },
  { clienteId: 2, nombre: "Joaquín Bravo", foto: "https://i.pravatar.cc/150?img=12", membresia: "Mensual", vencimiento: "2026-07-12", monto: 18000, metodoPago: "Mercado Pago", estadoPago: "Pagado" },
  { clienteId: 3, nombre: "Valentina Ríos", foto: "https://i.pravatar.cc/150?img=32", membresia: "Trimestral", vencimiento: "2026-06-18", monto: 48600, metodoPago: null, estadoPago: "Pendiente" },
  { clienteId: 4, nombre: "Mateo Sosa", foto: "https://i.pravatar.cc/150?img=51", membresia: "Semestral", vencimiento: "2026-10-22", monto: 88200, metodoPago: "Tarjeta", estadoPago: "Pagado" },
  { clienteId: 5, nombre: "Camila Núñez", foto: "https://i.pravatar.cc/150?img=23", membresia: "Mensual", vencimiento: "2026-07-05", monto: 18000, metodoPago: "Efectivo", estadoPago: "Pagado" },
  { clienteId: 6, nombre: "Tomás Ledesma", foto: "https://i.pravatar.cc/150?img=14", membresia: "Mensual", vencimiento: "2026-05-30", monto: 18000, metodoPago: null, estadoPago: "Pendiente" },
  { clienteId: 7, nombre: "Lucía Paredes", foto: "https://i.pravatar.cc/150?img=44", membresia: "Anual", vencimiento: "2027-01-15", monto: 158400, metodoPago: "Mercado Pago", estadoPago: "Pagado" },
  { clienteId: 8, nombre: "Benjamín Castro", foto: "https://i.pravatar.cc/150?img=53", membresia: "Trimestral", vencimiento: "2026-06-25", monto: 48600, metodoPago: null, estadoPago: "Pendiente" },
  { clienteId: 9, nombre: "Agustina Vega", foto: "https://i.pravatar.cc/150?img=29", membresia: "Semestral", vencimiento: "2026-11-09", monto: 88200, metodoPago: "Mercado Pago", estadoPago: "Pagado" },
  { clienteId: 10, nombre: "Nicolás Funes", foto: "https://i.pravatar.cc/150?img=15", membresia: "Mensual", vencimiento: "2026-07-20", monto: 18000, metodoPago: "Efectivo", estadoPago: "Pagado" },
];
