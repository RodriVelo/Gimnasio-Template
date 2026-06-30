import {
  LayoutDashboard, Users, CreditCard, IdCard, Dumbbell, ListChecks,
  CalendarDays, BarChart3, Home, GraduationCap, ClipboardList,
  ClipboardPlus, MessageSquare, Repeat, CalendarCheck, LineChart,
  Receipt, UserCircle, UserCheck, Wallet,
} from "lucide-react";

export const adminNav = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, end: true },
  { label: "Clientes", to: "/admin/clientes", icon: Users },
  { label: "Asistencia", to: "/admin/asistencia", icon: UserCheck },
  { label: "Membresías", to: "/admin/membresias", icon: IdCard },
  { label: "Estado de cuotas", to: "/admin/estado-membresias", icon: Wallet },
  { label: "Pagos", to: "/admin/pagos", icon: CreditCard },
  { label: "Entrenadores", to: "/admin/entrenadores", icon: GraduationCap },
  { label: "Ejercicios", to: "/admin/ejercicios", icon: Dumbbell },
  { label: "Horarios", to: "/admin/horarios", icon: CalendarDays },
  { label: "Reportes", to: "/admin/reportes", icon: BarChart3 },
];

export const trainerNav = [
  { label: "Inicio", to: "/entrenador", icon: Home, end: true },
  { label: "Mis alumnos", to: "/entrenador/alumnos", icon: Users },
  { label: "Rutinas", to: "/entrenador/rutinas", icon: ListChecks },
  { label: "Asignar rutina", to: "/entrenador/asignar", icon: ClipboardPlus },
  { label: "Mensajes", to: "/entrenador/mensajes", icon: MessageSquare },
];

export const clientNav = [
  { label: "Inicio", to: "/cliente", icon: Home, end: true },
  { label: "Mis rutinas", to: "/cliente/rutinas", icon: Repeat },
  { label: "Calendario", to: "/cliente/calendario", icon: CalendarDays },
  { label: "Confirmar asistencia", to: "/cliente/asistencia", icon: CalendarCheck },
  { label: "Progreso", to: "/cliente/progreso", icon: LineChart },
  { label: "Pagos", to: "/cliente/pagos", icon: Receipt },
  { label: "Perfil", to: "/cliente/perfil", icon: UserCircle },
];

export const roleConfig = {
  admin: { label: "Administrador", nav: adminNav, base: "/admin", userName: "Diego Herrera", userRole: "Administrador" },
  entrenador: { label: "Entrenador", nav: trainerNav, base: "/entrenador", userName: "Lucas Ferreyra", userRole: "Entrenador" },
  cliente: { label: "Cliente", nav: clientNav, base: "/cliente", userName: "Martina Acosta", userRole: "Cliente" },
};
