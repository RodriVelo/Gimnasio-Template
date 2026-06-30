import { Zap, Flame, Crown, Star } from "lucide-react";

export const memberships = [
  {
    id: "mensual",
    nombre: "Mensual",
    precio: 18000,
    periodo: "/mes",
    icon: Zap,
    clientes: 142,
    beneficios: ["Acceso full a sala de musculación", "Clases grupales ilimitadas", "1 evaluación física inicial", "App de seguimiento"],
  },
  {
    id: "trimestral",
    nombre: "Trimestral",
    precio: 48600,
    periodo: "/3 meses",
    icon: Flame,
    clientes: 96,
    destacado: true,
    beneficios: ["Todo lo del plan Mensual", "2 sesiones con entrenador personal", "Plan nutricional básico", "Congelamiento 7 días"],
  },
  {
    id: "semestral",
    nombre: "Semestral",
    precio: 88200,
    periodo: "/6 meses",
    icon: Star,
    clientes: 58,
    beneficios: ["Todo lo del plan Trimestral", "4 sesiones con entrenador personal", "Acceso a zona spa", "Congelamiento 15 días"],
  },
  {
    id: "anual",
    nombre: "Anual",
    precio: 158400,
    periodo: "/año",
    icon: Crown,
    clientes: 34,
    beneficios: ["Todo lo del plan Semestral", "Entrenador personal mensual", "Plan nutricional avanzado", "Invitados: 4 por mes", "Merchandising de regalo"],
  },
];

export const payments = [
  { id: 1, cliente: "Martina Acosta", fecha: "2026-06-28", monto: 158400, medio: "Tarjeta de crédito", estado: "Pagado" },
  { id: 2, cliente: "Joaquín Bravo", fecha: "2026-06-27", monto: 18000, medio: "Mercado Pago", estado: "Pagado" },
  { id: 3, cliente: "Valentina Ríos", fecha: "2026-06-15", monto: 48600, medio: "Transferencia", estado: "Pendiente" },
  { id: 4, cliente: "Mateo Sosa", fecha: "2026-06-22", monto: 88200, medio: "Tarjeta de débito", estado: "Pagado" },
  { id: 5, cliente: "Camila Núñez", fecha: "2026-06-20", monto: 18000, medio: "Efectivo", estado: "Pagado" },
  { id: 6, cliente: "Tomás Ledesma", fecha: "2026-05-30", monto: 18000, medio: "Mercado Pago", estado: "Vencido" },
  { id: 7, cliente: "Lucía Paredes", fecha: "2026-06-10", monto: 158400, medio: "Tarjeta de crédito", estado: "Pagado" },
  { id: 8, cliente: "Benjamín Castro", fecha: "2026-06-05", monto: 48600, medio: "Transferencia", estado: "Pendiente" },
  { id: 9, cliente: "Agustina Vega", fecha: "2026-06-18", monto: 88200, medio: "Mercado Pago", estado: "Pagado" },
  { id: 10, cliente: "Nicolás Funes", fecha: "2026-06-26", monto: 18000, medio: "Efectivo", estado: "Pagado" },
];

export const trainers = [
  { id: 1, nombre: "Lucas Ferreyra", especialidad: "Fuerza y powerlifting", alumnos: 24, foto: "https://i.pravatar.cc/150?img=68", experiencia: "8 años", certificaciones: ["NSCA-CPT", "Powerlifting Coach Nivel 2"] },
  { id: 2, nombre: "Sofía Méndez", especialidad: "Funcional y HIIT", alumnos: 31, foto: "https://i.pravatar.cc/150?img=45", experiencia: "6 años", certificaciones: ["ACE-CPT", "Instructora CrossTraining"] },
  { id: 3, nombre: "Brenda Quiroga", especialidad: "Hipertrofia y nutrición", alumnos: 19, foto: "https://i.pravatar.cc/150?img=49", experiencia: "5 años", certificaciones: ["ISSN Nutrición Deportiva"] },
  { id: 4, nombre: "Ezequiel Mansilla", especialidad: "Movilidad y rehabilitación", alumnos: 14, foto: "https://i.pravatar.cc/150?img=33", experiencia: "10 años", certificaciones: ["Kinesiólogo Deportivo"] },
];

export const exercises = [
  { id: 1, nombre: "Sentadilla con barra", grupo: "Piernas", dificultad: "Intermedio", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=60", desc: "Ejercicio compuesto para cuádriceps, glúteos y core." },
  { id: 2, nombre: "Press de banca", grupo: "Pecho", dificultad: "Intermedio", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=60", desc: "Trabajo de pectoral, deltoides anterior y tríceps." },
  { id: 3, nombre: "Peso muerto", grupo: "Espalda", dificultad: "Avanzado", img: "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?w=400&q=60", desc: "Cadena posterior completa: lumbares, glúteos e isquios." },
  { id: 4, nombre: "Dominadas", grupo: "Espalda", dificultad: "Avanzado", img: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&q=60", desc: "Dorsal ancho y bíceps con peso corporal." },
  { id: 5, nombre: "Curl de bíceps", grupo: "Brazos", dificultad: "Principiante", img: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=400&q=60", desc: "Aislamiento de bíceps braquial con mancuernas." },
  { id: 6, nombre: "Plancha abdominal", grupo: "Core", dificultad: "Principiante", img: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400&q=60", desc: "Estabilidad de core e isometría de cuerpo completo." },
  { id: 7, nombre: "Zancadas", grupo: "Piernas", dificultad: "Principiante", img: "https://images.unsplash.com/photo-1434596922112-19c563067271?w=400&q=60", desc: "Trabajo unilateral de cuádriceps y glúteos." },
  { id: 8, nombre: "Remo con mancuerna", grupo: "Espalda", dificultad: "Intermedio", img: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=400&q=60", desc: "Dorsal y romboides con movimiento unilateral." },
];

export const schedule = [
  { hora: "07:00", lunes: "Funcional", martes: "Spinning", miercoles: "Funcional", jueves: "Yoga", viernes: "CrossTraining", profesor: "Sofía Méndez" },
  { hora: "09:00", lunes: "Musculación libre", martes: "Musculación libre", miercoles: "Musculación libre", jueves: "Musculación libre", viernes: "Musculación libre", profesor: "Lucas Ferreyra" },
  { hora: "12:00", lunes: "HIIT", martes: "Pilates", miercoles: "HIIT", jueves: "Pilates", viernes: "HIIT", profesor: "Brenda Quiroga" },
  { hora: "18:00", lunes: "Spinning", martes: "Funcional", miercoles: "Spinning", jueves: "Funcional", viernes: "Zumba", profesor: "Sofía Méndez" },
  { hora: "20:00", lunes: "Powerlifting", martes: "Movilidad", miercoles: "Powerlifting", jueves: "Movilidad", viernes: "Stretching", profesor: "Ezequiel Mansilla" },
];

export const recentActivity = [
  { id: 1, texto: "Martina Acosta renovó su membresía Anual", tiempo: "Hace 12 min" },
  { id: 2, texto: "Nuevo cliente registrado: Nicolás Funes", tiempo: "Hace 48 min" },
  { id: 3, texto: "Lucas Ferreyra creó una rutina para Joaquín Bravo", tiempo: "Hace 1 h" },
  { id: 4, texto: "Pago pendiente de Valentina Ríos próximo a vencer", tiempo: "Hace 2 h" },
  { id: 5, texto: "Brenda Quiroga marcó asistencia de 8 alumnos", tiempo: "Hace 3 h" },
];

export const revenueChart = [
  { mes: "Ene", ingresos: 980000 },
  { mes: "Feb", ingresos: 1040000 },
  { mes: "Mar", ingresos: 1120000 },
  { mes: "Abr", ingresos: 1080000 },
  { mes: "May", ingresos: 1230000 },
  { mes: "Jun", ingresos: 1340000 },
];

export const clientsPerMonth = [
  { mes: "Ene", clientes: 210 }, { mes: "Feb", clientes: 224 }, { mes: "Mar", clientes: 238 },
  { mes: "Abr", clientes: 251 }, { mes: "May", clientes: 268 }, { mes: "Jun", clientes: 284 },
];

export const attendanceChart = [
  { dia: "Lun", asistencias: 86 }, { dia: "Mar", asistencias: 102 }, { dia: "Mié", asistencias: 94 },
  { dia: "Jue", asistencias: 110 }, { dia: "Vie", asistencias: 98 }, { dia: "Sáb", asistencias: 64 }, { dia: "Dom", asistencias: 31 },
];

export const newSignupsChart = [
  { mes: "Ene", altas: 18 }, { mes: "Feb", altas: 22 }, { mes: "Mar", altas: 15 },
  { mes: "Abr", altas: 27 }, { mes: "May", altas: 24 }, { mes: "Jun", altas: 31 },
];
