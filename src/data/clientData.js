export const myRoutines = [
  { id: 1, nombre: "Quema grasa nivel 1", objetivo: "Pérdida de peso", duracion: "45 min", ejercicios: [
    { id: 1, nombre: "Sentadilla con barra", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&q=60", series: 4, repeticiones: 12, descanso: "60 seg", obs: "Mantener espalda recta, bajar hasta 90°." },
    { id: 2, nombre: "Plancha abdominal", img: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=300&q=60", series: 3, repeticiones: "45 seg", descanso: "30 seg", obs: "Core firme, no hundir cadera." },
    { id: 3, nombre: "Zancadas", img: "https://images.unsplash.com/photo-1434596922112-19c563067271?w=300&q=60", series: 3, repeticiones: 14, descanso: "45 seg", obs: "Alternar pierna en cada repetición." },
  ]},
  { id: 2, nombre: "Cardio HIIT", objetivo: "Resistencia", duracion: "30 min", ejercicios: [
    { id: 4, nombre: "Burpees", img: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=300&q=60", series: 5, repeticiones: 15, descanso: "30 seg", obs: "Ritmo alto, controlar la respiración." },
    { id: 5, nombre: "Mountain climbers", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&q=60", series: 4, repeticiones: "40 seg", descanso: "20 seg", obs: "Cadera estable durante todo el movimiento." },
  ]},
];

export const upcomingClasses = [
  { id: 1, actividad: "Funcional", fecha: "Mañana", hora: "18:00", profesor: "Sofía Méndez", estado: "Pendiente" },
  { id: 2, actividad: "Spinning", fecha: "Jueves", hora: "07:00", profesor: "Sofía Méndez", estado: "Pendiente" },
  { id: 3, actividad: "Musculación libre", fecha: "Viernes", hora: "09:00", profesor: "Lucas Ferreyra", estado: "Confirmada" },
];

export const myPayments = [
  { id: 1, fecha: "2026-06-28", monto: 158400, medio: "Tarjeta de crédito", estado: "Pagado" },
  { id: 2, fecha: "2026-01-04", monto: 158400, medio: "Tarjeta de crédito", estado: "Pagado" },
  { id: 3, fecha: "2025-07-10", monto: 88200, medio: "Transferencia", estado: "Pagado" },
];

export const progressData = {
  peso: [
    { mes: "Ene", valor: 78 }, { mes: "Feb", valor: 76.5 }, { mes: "Mar", valor: 75 },
    { mes: "Abr", valor: 73.8 }, { mes: "May", valor: 72.5 }, { mes: "Jun", valor: 71.2 },
  ],
  masaMuscular: [
    { mes: "Ene", valor: 31 }, { mes: "Feb", valor: 31.4 }, { mes: "Mar", valor: 32 },
    { mes: "Abr", valor: 32.6 }, { mes: "May", valor: 33.1 }, { mes: "Jun", valor: 33.7 },
  ],
  medidas: [
    { mes: "Ene", cintura: 88 }, { mes: "Feb", cintura: 86 }, { mes: "Mar", cintura: 84 },
    { mes: "Abr", cintura: 82.5 }, { mes: "May", cintura: 81 }, { mes: "Jun", cintura: 79.5 },
  ],
  entrenamientos: [
    { mes: "Ene", cantidad: 12 }, { mes: "Feb", cantidad: 14 }, { mes: "Mar", cantidad: 16 },
    { mes: "Abr", cantidad: 15 }, { mes: "May", cantidad: 18 }, { mes: "Jun", cantidad: 20 },
  ],
  fotos: [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=60",
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&q=60",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&q=60",
    "https://images.unsplash.com/photo-1554344728-77cf90d9ed26?w=300&q=60",
  ],
};

export const myProfile = {
  nombre: "Martina Acosta",
  email: "martina.acosta@mail.com",
  telefono: "+54 9 11 2345-6781",
  foto: "https://i.pravatar.cc/150?img=47",
  objetivos: "Pérdida de peso y mejora de resistencia cardiovascular",
  entrenador: "Lucas Ferreyra",
  membresia: "Anual",
  vencimiento: "2026-12-04",
  proximoPago: "2026-12-04",
};
